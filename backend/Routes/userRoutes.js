const express = require('express');
const router = express.Router();
const {verifyEmail} = require('../controllers/userController')
const path = require('path');
router.get('/verify/:userId/:token',verifyEmail);
router.get(`/verified`,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','verify.html'));
})
module.exports = router;