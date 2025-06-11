const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Item = require("../models/item");

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  


// router.post("/cart", alreadyLoggedIn, async (req, res) => {

// try {
//     const newItem = {
//       itemId: req.body.itemId,
//       count: 1, // You might modify this based on your logic
//     };
//     const cart = await Cart.findOneAndUpdate(
//       { userId: req.user._id },
//       { $push: { items: newItem } },
//       { new: true, upsert: true }
//     );
//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post("/cart", alreadyLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const itemId = req.body.itemId;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart and add the item
      const newCart = new Cart({
        userId,
        items: [{ itemId, count: 1 }] // Initial count as 1 for the added item
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.itemId === itemId);

    if (existingItem) {
      // If the item exists, increment its count
      existingItem.count += 1;
    } else {
      // If the item doesn't exist, add it to the cart with count as 1
      cart.items.push({ itemId, count: 1 });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/updateCart", async (req, res) => {
  try {
    const { updatedItems } = req.body;

    // Assuming you have a user ID available
    const userId = req.user._id.toString(); // Convert the user ID to a string if it's not

    // Fetch the cart for the logged-in user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Update the counts for each item in the cart
    updatedItems.forEach((updatedItem) => {
      const cartItem = cart.items.find(item => item.itemId === updatedItem._id);

      if (cartItem) {
        cartItem.count = updatedItem.count;
      }
    });

    // Save the updated cart
    await cart.save();

    // Retrieve the updated cart after changes
    const updatedCart = await Cart.findOne({ userId });

    res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/checkout", alreadyLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id.toString() });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Group items in the cart and calculate the count for each item
    const aggregatedItems = cart.items.reduce((acc, currentItem) => {
      if (acc[currentItem.itemId]) {
        acc[currentItem.itemId].count += currentItem.count;
      } else {
        acc[currentItem.itemId] = {
          count: currentItem.count,
          itemId: currentItem.itemId,
        };
      }
      return acc;
    }, {});

    // Fetch details of items in the cart based on the aggregated items
    const itemIds = Object.keys(aggregatedItems);
    const items = await Item.find({ _id: { $in: itemIds } });

    // Prepare the data for rendering the checkout page
    const checkoutItems = items.map((item) => {
      return {
        ...item.toObject(),
        count: aggregatedItems[item._id.toString()].count,
      };
    });

    res.render("./pages/checkout", { items: checkoutItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/checkout", alreadyLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id.toString() });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const countChanges = {};

    // Iterate through cart items and accumulate changes in count
    for (const cartItem of cart.items) {
      if (!countChanges[cartItem.itemId]) {
        countChanges[cartItem.itemId] = 0;
      }
      countChanges[cartItem.itemId] -= cartItem.count;
    }

    // Prepare the array for updating items
    const bulkUpdate = [];
    const itemIds = Object.keys(countChanges);
    for (const itemId of itemIds) {
      if (countChanges[itemId] !== 0) {
        bulkUpdate.push({
          updateOne: {
            filter: { _id: itemId },
            update: { $inc: { count: countChanges[itemId] } },
          },
        });
      }
    }

    // Update the item counts in the database
    if (bulkUpdate.length > 0) {
      await Item.bulkWrite(bulkUpdate);
    }

    // Clear the cart after purchase
    await Cart.findOneAndUpdate(
      { userId: req.user._id.toString() },
      { $set: { items: [] } },
      { new: true }
    );

    res.status(200).json({ message: "Items bought successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// router.get("/cart", alreadyLoggedIn, async (req, res) => {
//   try {

//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.get("/cart", alreadyLoggedIn, async (req, res) => {
  try {
    //console.log("requser", req.user);
    const cart = await Cart.findOne({ userId: req.user._id.toString()});
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/cart", async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ userId: req.user._id.toString() });
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
