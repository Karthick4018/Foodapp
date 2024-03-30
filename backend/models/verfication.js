const mongoose = require('mongoose');
const verifyschema = new mongoose.Schema({
    id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    userid:{
        type:String,
    },
    token:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    expiresAt:{
        type:Date
    },
},{timestamps:true});
const verification = mongoose.model('verification',verifyschema);
module.exports =verification;