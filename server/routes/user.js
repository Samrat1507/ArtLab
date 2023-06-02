import express from 'express'
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

const router=express.Router()
dotenv.config();
const SECRET=process.env.SECRET

router.route('/register').post(async(req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(200).send(JSON.stringify({message:"user created successfully"}));
    } catch(error) {
        console.log(error);
        res.status(400).send(JSON.stringify({message:"400"}));
    }
})

router.route('/login').post(async(req,res)=>{
    const data=req.body;
    const user=await User.findOne({
        email: data.email,
    })

    if(!user)
        res.send(JSON.stringify({status:404}))
    if(!(await user.comparePassword(data.password)))
        res.send(JSON.stringify({status:401}))
    const token=jwt.sign({
        email: data.email,
    },SECRET)
    res.send(JSON.stringify({status:200,user:token}))

})

router.route('/auth').get(async(req,res)=>{
    const token=req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,SECRET)
        const email = decoded.email
        const user = await User.findOne({ email :email})
        
        
        res.send(JSON.stringify({
            email:user.email,
            artist_name:user.artist_name,
            createdAt: user.createdAt,
            profile_photo: user.profile_photo,
            watermark: user.watermark_photo,
        }))
    }catch(err){
        console.error(err)
        res.send(JSON.stringify({status:401}))
    }
   
})

export default router



