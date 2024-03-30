const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    itemid: { type: String },
    itemname: { type: String},
    price: { type: Number},
    description: { type: String},
    rating: { type: Number},
    ratings: { type: Number},
    image: { type: String},
    veg: { type:String},
    bestSeller: { type: String},
    quantity: { type: Number, default: 1 } // Default quantity is 1
      });
const MenuItem = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    item:[menuItemSchema]
},{timestamps:true});
const Menu = mongoose.model('Menu',MenuItem);
module.exports = Menu