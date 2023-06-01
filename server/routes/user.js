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

router.route('/feed').get((req,res)=>{
    const token=req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,SECRET)
        console.log(decoded)
        res.send(decoded)
    }catch(err){
        console.log(err)
        res.send(JSON.stringify({status:401}))
    }
    
    res.send(JSON.stringify({msg:"ok"}))
})

export default router
