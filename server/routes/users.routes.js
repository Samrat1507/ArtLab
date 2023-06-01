import express from "express";
import User from "../models/user.js";
import passport from "passport";
import initializingPassport from "../passportConfig.js";

initializingPassport(passport);

const router = express.Router();

router.route('/register').post(async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(200).send(JSON.stringify({message:"user created successfully"}));
    } catch(error) {
        console.log(error);
        res.status(400).send(JSON.stringify({message:"400"}));
    }
})

router.route('/login').post(passport.authenticate("local", { failureFlash: true }), (req, res)=> {
    res.status(200).send(JSON.stringify({message:"Logged in"}));
})

export default router;