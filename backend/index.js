const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const routes = require('./Routes/index');
const port = process.env.PORT||5000;
const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err.message)
})
app.use(helmet())
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Content-Security-Policy',"script-src 'self' 'unsafe-inline'");
    next();
})
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(routes);
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
