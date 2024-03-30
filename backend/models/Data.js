const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        requried:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})
const Data = new mongoose.model('Data',DataSchema);
module.exports = Data