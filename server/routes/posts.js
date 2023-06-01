import express from "express";

import jwt from "jsonwebtoken";
import { get } from "mongoose";


const router = express.Router();

router.route("/feed").get((req,res )=>{
    //const token = req.headers[]
    res.send("OK");
})

router.route("/create").post((req,res)=>{
    const data=req.body
    console.log(data)
    res.send("ok")
})

export default router
