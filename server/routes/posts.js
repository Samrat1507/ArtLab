import express from "Express";

import jwt from "jsonwebtoken";
import { get } from "mongoose";


const router = express.Router();

router.route("/feed").get((req,res )=>{
    //const token = req.headers[]
    res.send("OK");
})
