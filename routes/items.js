const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const Item = require("../models/item");

router.use(methodOverride('_method'));

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  


router.post("/items",alreadyLoggedIn, async (req, res) => {
  try {
     
    const newItem = await Item.create(req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("items/filter",alreadyLoggedIn, async (req, res) =>  {

 
});



router.get("/items", alreadyLoggedIn, async (req, res) => {
  try {
      const items = await Item.find();
      res.render("./pages/items", { items: items, message: req.query.message }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/items/:itemId", alreadyLoggedIn ,async (req, res) => {
  try {
    const itemId = req.params.itemId;
    if(itemId == "add") {
      res.render('pages/addItem');
    } 
    else if (itemId == "filter"){
     title = req.query.title
  type = req.query.type
  console.log("title", title);
  console.log("type", type);

  if(title && type){
    const regexForTitle = new RegExp(req.query.title, 'i'); 
    Item.find({
      type: req.query.type,
      name: { $regex: regexForTitle },
    }).then((itemsData) => {
      res.render("./pages/items", { items: itemsData });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
  }
  else if(!title){
    Item.find({
      type: req.query.type
    }).then((itemsData) => {
      res.render('./pages/items', { items: itemsData });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });

  }
  else if (!type) {
    const regexForTitle = new RegExp(req.query.title, 'i'); 
    Item.find({
      name: { $regex: regexForTitle },
    }).then((itemsData) => {
      res.render('./pages/items', { items: itemsData });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
  
}
    }
    else {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/items/:id/edit', async (req, res) => {
  try {
      const itemId = req.params.id;
      const item = await Item.findById(itemId).exec();

      if (!item) {
          res.status(404).send('Item not found');
          return;
      }

      res.render('pages/editItem', { item });
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

router.put('/items/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      const updatedItem = req.body;

      const result = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
      
      if (!result) {
          res.status(404).send('Item not found');
          return;
      }

      res.redirect("/admin?message=Item updated successfully");
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

router.delete("/items/:itemId", alreadyLoggedIn,  async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.redirect("/admin?message=Item deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
