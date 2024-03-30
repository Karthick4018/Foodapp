const Items = require('../models/items')
const HotelData = require('../models/hotelData')
const Allhotels = require('../models/Allhotels')
const Data = require('../models/Data')
const multer = require('multer');
const Menu = require('../models/Menu')
const addItem = async(req,res,next)=>{
    const {id,name}=req.body
    try{
        if(!name){
            return res.status(200).json({
                success:false,
                message:`name is required`
            })
        }else{
            const item = await Items.create({
                id:id,
                name:name
            })
            item.save();
            res.status(200).json({
                success:true,
                message:`${name} entered successfully`,
                data:name
            })
        }
    }catch(err){
        console.log(err.message);
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const getItems = async(req,res,next)=>{
    try{
        const data = await Items.find({});
        if(!data){
            return res.status(404).json({
                success:false,
                message:`no data found`
            })
        }else{
            return res.status(200).json({
                success:true,
                data:data
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const storage =multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname, '../uploads/images'));
    },
    filename:function(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
const upload =multer({storage:storage});
const getHotel = async(req,res,next)=>{
    try{
        const data = await HotelData.find({});
        if(!data){
            return res.status(200).json({
                success:false,
                message:'no Data found'
            })
        }else{
            return res.status(200).json({
                success:true,
                message:`data fetched`,
                data:data
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const getData = async(req,res,next)=>{
    try{
        const data = await Data.find({})
        if(!data){
            return res.status(200).json({
                success:false,
                message:`no data found`
            })
        }else{
            return res.status(200).json({
                success:true,
                data:data
            })
        }
    }catch(err){
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const getallhotels =async(req,res,next)=>{
    try{
        const data = await Allhotels.find({})
        if(!data){
            return res.status(400).json({
                success:false,
                message:'no data'
            })
        }else{
            return res.status(200).json({
                success:true,
                data:data
            })
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            error:err.message
        })
    }
}
const getMenu = async(req,res,next)=>{
    try{
        const data = await Menu.find({});
        if(!data){
            return res.status(404).json({
                success:false,
                message:`No data found`
            })
        }else{
            return res.status(200).json({
                success:true,
                data:data
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const getSearch = async (req, res, next) => {
    try {
        const{search}=req.body
        console.log(typeof search)
        const searchQuery ={
            $or:[
                    {cuisine:{$regex:search,$options:"i"}},
                    {name:{$regex:search,$options:"i"}},
                    {averagecost:{$regex:search,$options:"i"}}
            ]
        }
        console.log(searchQuery)
        const data = await Allhotels.find(search?searchQuery:{});
        if(data.length===0){
            return res.status(200).json({
                success:false,
                message:`no match found `
            })
        }
        return res.status(200).json({
            success:true,
            data:data
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            message: err.message
        });
    }
};
module.exports ={addItem,
getItems,getHotel,getData,getallhotels,getMenu,getSearch}