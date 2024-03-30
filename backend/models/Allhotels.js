const mongoose = require('mongoose');
const AllHotelsSchema = new mongoose.Schema({
    image:{
        type:[String]
    },
    name:{
        type:String,
        required:true,
    },
    cuisine:{
        type:String,
        required:true,
    },
    averagecost:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    time:{
        type:String
    },
    address:{
        type:String
    },
    smalladdress:{
        type:String
    },
    offer:{
        type:String
    },
    deliveries:{
        type:Number,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String
    }
},{timestamps:true})
const Allhotels = mongoose.model('Allhotels',AllHotelsSchema);
module.exports = Allhotels;