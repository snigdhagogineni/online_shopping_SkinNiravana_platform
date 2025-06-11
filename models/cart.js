// const mongoose = require('mongoose');
// passportLocalMongoose = require('passport-local-mongoose');

// const cartItemSchema = new mongoose.Schema({
//     itemId: { type: String, required: true },
//     count: { type: Number, required: true }
// });


// const cartSchema = new mongoose.Schema({
//     userId: { type: String, required: true},
//     items: [cartItemSchema]  
// });

// cartSchema.plugin(passportLocalMongoose);
// const Cart = mongoose.model('Cart', cartSchema);
// module.exports = Cart;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Assuming the user ID is a string for simplicity
    required: true,
  },
  items: [
    {
      itemId: String, // Assuming the item ID is a string
      count: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
