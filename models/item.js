const mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose');
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    value: { type: Number, required: true },
    count: { type: Number, required: true },
    image: { type: String },
    type: {type:String}
});

itemSchema.plugin(passportLocalMongoose);
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
