const express = require('express');
const {v4:uuidv4} = require('uuid');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const verification = require('../models/verfication');
const nodemailer = require('nodemailer');
const hashPassword = async(password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(password,salt)
        return hashedPassword;
    }catch(err){
        console.log(err.message);
    }
}
const createJWT=(id)=>{
    return jwt.sign({userId:id},process.env.SECRET_KEY,{
        expiresIn:"1d"
    })
}
const comparePassword = async (userpassword,hashedpassword)=>{
    const match = await bcrypt.compare(userpassword,hashedpassword);
    return match
}
const sendEmail = async(user,res)=>{
    const {email,_id,name} = user;
    const token =_id+ uuidv4();
    const LINK = process.env.LINK;
    const link =LINK +"/users/verify"+"/"+_id +"/"+token; 
    const AUTH_USER = process.env.AUTH_EMAIL;
    const AUTH_PASSWORD = process.env.AUTH_PASSWORD;
    const transporter = nodemailer.createTransport({
        host:'smtp-mail.outlook.com',
        port:587,
        secure:false,
        auth:{
            user:AUTH_USER,
            pass:AUTH_PASSWORD,
        }
    })
    const mailoptions = {
        from:{
            name:'Karthik_Todo',
            address:AUTH_USER,
        },
        to:email,
        subject:`${email} verification process`,
        html:`<h1>Hello ${name} thank you !!! for registering.</h1><div> click the link below</div>
        <a href=${link}>VERIFY</a>`
    }
    try{
       const hashtoken = await hashPassword(token);
       const existingUser = await verification.findOne({userid:_id});
        if(existingUser){
            return res.status(200).json({
                success:false,
                message:`Verification email has been already sent  to ${email}`
            });
        }
        const newUser = await verification.create({
            id:_id,
            userid:_id,
            token:hashtoken,
            createdAt:Date.now(),
            expiresAt: Date.now() + (2 * 60 * 1000),
        })
        const data = await verification.findOne({id:_id}).populate({
            path:'id',
            select:'name email'
        })
        if(newUser){
            transporter.sendMail(mailoptions).then(()=>{
                res.status(200).json({
                    success:true,
                    message:`verification mail has been sent to ${email}`,
                    data:data
                })
            }).catch((err)=>{
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:`something went wrong`
                })
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const verifyEmail = async(req,res)=>{
    const {userId,token} = req.params;
    console.log(userId,token)
    try{
        const finduser = await User.findOne({_id:userId});
        if(finduser?.verified===true){
            const message = `Dear ${finduser?.name}..Email already verified for ${finduser?.email}`;
            return res.redirect(`/users/verified?status=success&message=${message}`);
        }
        const user = await verification.findOne({userid:userId});
        console.log(user)
        if(user){
            const {expiresAt} = user;
            const hashedToken = user?.token;
            if(expiresAt<Date.now()){
                await verification.findOneAndDelete({userid:userId}).then(()=>{
                    User.findOneAndDelete({_id:userId}).then(()=>{
                        const message= `verification token has expired`;
                        return res.redirect(`/users/verified?status=error&message=${message}`);
                    }).catch((err)=>{
                        console.log(err)
                        res.redirect(`/users/verified?status=error&message=${err.message}`);
                    })
                }).catch((err)=>{
                    console.log(err)
                    res.redirect(`/users/verified?status=error&message=${err.message}`);
                })
            }else{
                await comparePassword(token,hashedToken).then(async (match)=>{
                    if(match){
                         User.findOneAndUpdate({_id:userId},{verified:true}).then(async()=>{
                            verification.findOneAndDelete({userid:userId}).then(async ()=>{
                                const newUser =await  User.findOne({_id:userId});
                                console.log(newUser)
                                const message=`Email Verified Successfully`
                                const name=newUser?.name
                                const email =newUser?.email
                                const message2 = `THANKYOU ${name} your email id (${email}) is now verified!`
                                res.redirect(`/users/verified?status=success&message=${message}&message2=${message2}`);
                            });
                        }).catch((err)=>{
                            console.log(err)
                            const message=`verification link is failed or invalid`
                            res.redirect(`/users/verified?status=error&message=${message}`);
                        })
                    }else{
                        const message = `Someting went wrong`
                        res.redirect(`/users/verified?status=error&message=${message}`);
                    }

                }).catch((err)=>{
                    console.log(err)
                    const message=`verification link is invalid or failed`
                    res.redirect(`/users/verified?status=error&message=${message}`)
                })
            }
        }else{
            const message = `Invalid verification link..try again later`
            res.redirect(`/users/verified?status=error&message=${message}`);
        }
    }catch(err){
        return res.status(404).json({
            message:err.message
        })
    }
}
const register = async(req,res,next)=>{
    const{name,email,password}= req.body;
    try{
        if(!name||!email||!password){
            return res.status(200).json({
                success:false,
                message:`enter all fields`
            })
        }
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(200).json({
                success:false,
                message:`User with this email ${email} already exists`,
            });
        }else{
            const hashedpassword = await hashPassword(password);
            const newUser = await User.create({
                name:name,
                email:email,
                password:hashedpassword,
            });
            await newUser.save();
            await sendEmail(newUser,res);
        }
    }catch(err){
        console.log(err.message)
        res.status(404).json({
            message:err.message
        })
    }
}
const login = async(req,res,next)=>{
    const {email,password} = req.body
    try{
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:`sorry ${email} is not provided`
            })
        }
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:`${email} does not exists`
            })
        }
        if(!user?.verified){
            return res.status(200).json({
                success:false,
                message:`${email} is not verified yet. please verify`
            })
        }
        const match = await comparePassword(password,user?.password);
        if(!match){
            return res.status(200).json({
                success:false,
                message:`password for ${email} does not match`
            })
        }
        const token = createJWT(user?._id);
        res.status(200).json({
            success:true,
            message:`login sucessfull..Welcome ${user?.name}`,
            data:user,
            token:token,
        })
    }catch(err){
        console.log(err)
        res.status(200).json({
            success:false,
            message:`sorry ${email} something went wrong`,
            error:err.message
        })
    }
}
module.exports = {register,login,verifyEmail};