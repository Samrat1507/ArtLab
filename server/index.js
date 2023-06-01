import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import feedRoute from './routes/feed.routes.js';
import userRoute from './routes/users.routes.js';
import MongoStore from 'connect-mongo';

dotenv.config();
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{res.send("John Doe")})

app.use('/feed', feedRoute);
app.use('/user', userRoute);

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on Port : ${PORT}`)))
    .catch((error)=>console.log(error.message));

