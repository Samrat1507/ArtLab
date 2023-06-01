import express from "express";

import jwt from "jsonwebtoken";
import { get } from "mongoose";
import multer from "multer";

// Create multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

// Create multer upload instance with file size limit
const upload = multer({ storage: storage });


const router = express.Router();

router.route("/feed").get((req,res )=>{
    //const token = req.headers[]
    res.send("OK");
})

router.route("/create").post(upload.single('image'), (req,res)=>{
    const data=req.body
    console.log(data)
    res.send("ok")
})

export default router
