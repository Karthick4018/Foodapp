const mongoose = require('mongoose');
const items = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true});
const Items = mongoose.model('items',items);
module.exports = Items;