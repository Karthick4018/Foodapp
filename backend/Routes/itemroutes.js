const express = require('express');
const router = express.Router();
const HotelData = require('../models/hotelData')
const Allhotels = require('../models/Allhotels')
const Menu = require('../models/Menu')
const {addItem,getItems,getHotel,getData,getallhotels,getMenu,getSearch} = require('../controllers/itemController')
const path = require('path');
const Data = require('../models/Data');
const multer = require('multer');
const storage =multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname, '../uploads/images'));
    },
    filename:function(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
router.post('/searchitems',getSearch)
const storage1 = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../uploads/data'));
    },
    filename:function(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
const storage2 = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../uploads/Allhotels'));
    },
    filename:function(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
const upload1 = multer({storage:storage1})
const upload2 = multer({storage:storage2})
router.use('/images',express.static(path.join(__dirname, '../uploads/images')))
router.use('/data/images',express.static(path.join(__dirname,'../uploads/data')));
router.use('/allhotels/images',express.static(path.join(__dirname,'../uploads/Allhotels')));
router.use('/menu/images',express.static(path.join(__dirname,'../uploads/Menu')))
const upload =multer({storage:storage});
// router.post('/upload',upload.single('hotel'),(req,res)=>{
//     return res.status(200).json({
//         success:true,
//         imageUrl:`http://localhost:5000/items/images/${req.file.filename}`
//     })
// })
router.post('/addallhotels',upload2.array('allhotels'),async(req,res)=>{
    const {name
        ,cuisine
        ,averagecost
        ,rating
        ,time
        ,address
        ,smalladdress
        ,offer
        ,deliveries
        ,latitude
        ,longitude} = req.body
        try{
            const image = req.files.map((file)=>{
                return `http://192.168.1.12:${process.env.PORT}/items/allhotels/images/${file.filename}`
            })
            if(!name||!cuisine||!averagecost||!rating||!time||!address||!smalladdress||!offer||!deliveries||!latitude||!longitude){
                return res.status(400).json({
                    success:false,
                    message:`allfields needed`
                })
            }
            const data = await Allhotels.create({
                name:name,
                cuisine:cuisine,
                averagecost:averagecost,
                rating:rating,
                time:time,
                address:address,
                smalladdress:smalladdress,
                offer:offer,
                deliveries:deliveries,
                latitude:latitude,
                longitude:longitude,
                image:image
            })
            await data.save()
            if(data){
                return res.status(200).json({
                    success:true,
                    data:data
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:`something went wrong`
                })
            }
        }catch(err){
            console.log(err)
            return res.status(404).json({
                success:false,
                message:err.message
            })
        }
})
router.post('/additems',addItem);
router.get('/getitems',getItems)
router.get('/gethotel',getHotel)
router.get('/getallhotels',getallhotels)
router.post('/addhotel',upload.single('hotel'),async(req,res)=>{
    const {type,hotelName,foodName,price,time} = req.body
    try{
        const image = `http://192.168.1.12:${process.env.PORT}/items/images/${req.file.filename}`
        if(!image||!type||!hotelName||!foodName||!price){
            return res.status(200).json({
                success:false,
                message:`All fields required`
            })
        }else{
            const data = await HotelData.create({
                image:image,
                type:type,
                hotelName:hotelName,
                foodName:foodName,
                price:price,
                time:time,
            })
            await data.save();
            if(data){
                return res.status(200).json({
                    success:true,
                    data:data
                })
            }
        }

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
});
router.post('/adddata',upload1.single('data'),async(req,res)=>{
    const{id,name,description} = req.body
    try{
        const image = `http://192.168.1.12:${process.env.PORT}/items/data/images/${req.file.filename}`
        if(!id||!name||!description||!image){
            return res.status(400).json({
                success:false,
                message:`fields required`
            })
        }else{
            const data = await Data.create({
                id:id,
                name:name,
                description:description,
                image:image
            });
            await data.save();
            return res.status(200).json({
                success:true,
                data:data,
                message:'inserted'
            })
        }
    }catch(err){
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
});
const storage3 = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../uploads/Menu'));
    },
    filename:function(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
const upload3 = multer({storage:storage3});
router.post('/menu/images',upload3.single('menu'),async(req,res)=>{
    return res.status(200).json({
        success:true,
        image:`http://192.168.1.12:${process.env.PORT}/items/menu/images/${req.file.filename}`
    })
})
router.post('/addmenu',upload3.single('menu'),async(req,res)=>{
    const image = `http://192.168.1.12:${process.env.PORT}/items/menu/images/${req.file.filename}`
    const newItem = {
        itemid:req.body.itemid,
        itemname:req.body.itemname,
        price:req.body.price,
        description:req.body.description,
        rating:req.body.rating,
        ratings:req.body.ratings,
        image:image,
        veg:req.body.veg,
        bestSeller:req.body.bestSeller,
        quantity:req.body.quantity,
    }
    try{
        const data = await Menu.create({
            id:req.body.id,
            name:req.body.name,
            item:[newItem],
        });
        await data.save()
        if(data){
            return res.status(200).json({
                success:true,
                data:data
            })
        }
    }catch(err){
console.log(err)
return res.status(404)
.json({
    success:false,
    message:err.message
})} 
})
router.get('/getdata',getData);
router.get('/getmenu',getMenu);
module.exports = router