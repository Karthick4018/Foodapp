const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const itemroutes = require('./itemroutes')
router.use('/auth',authRoutes);
router.use('/items',itemroutes);
router.use('/users',userRoutes);
module.exports = router;