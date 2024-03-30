const mongoose  = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});
const User = mongoose.model('User',userschema);
module.exports = User;