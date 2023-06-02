import express from 'express'
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
import multer from 'multer';
import path from 'path';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router=express.Router()
dotenv.config();
const SECRET=process.env.SECRET

router.route('/register').post(async(req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(200).send(JSON.stringify({message:"user created successfully"}));
    } catch(error) {
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
            watermark_photo: user.watermark_photo,
        }))
    }catch(err){
        res.send(JSON.stringify({status:401}))
    }
   
})

router.route('/findUser').post(async(req,res)=>{
    try{
        const name = req.body.artist_name
        const user = await User.findOne({ artist_name :name})
        
        
        res.send(JSON.stringify({
            artist_name:user.artist_name,
            createdAt: user.createdAt,
            profile_photo: user.profile_photo,
            watermark_photo: user.watermark_photo,
        }))
    }catch(err){
        res.send(JSON.stringify({status:500}))
    }
   
})

router.route("/updateprofile").post(upload.single('file'), async (req,res)=>{
    try {
        const data = req.body
        const user = await User.findOne({email:data.email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profile_photo = req.file.filename;
        user.artist_name = req.body.artist_name;
        
        const updatedUser = await user.save();
    
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.route("/updatewatermark").post(upload.single('file'), async (req,res)=>{
    try {
        const data = req.body; 
        const user = await User.findOne({email: data.email});
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        user.watermark_photo = req.file.filename;
    
        const updatedUser = await user.save();
    
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.route("/:filename").get((req,res)=>{
    const {filename}=req.params
    const imagePath=path.join(__dirname,"..","uploads",filename)
    res.sendFile(imagePath)
})

export default router