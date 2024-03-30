const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    type:{
        type:String,
        required:true,
        unique:true
    },
    hotelName:{
        type:String,
        required:true
    },
    foodName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true,
    }
},{timestamps:true});
const HotelData = mongoose.model('HotelData',HotelSchema);
module.exports=HotelData;