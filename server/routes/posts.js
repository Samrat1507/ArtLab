import express from "express";
import multer from "multer";
import User from "../models/user.js";
import path from "path"
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

const router = express.Router();

router.route("/updateprofile").post(upload.single('file'), async (req,res)=>{
  try {
    const post = new User({
      artist_name: req.body.username,
      profile_photo: req.file.filename,
    });

    const savedPodcast = await post.save();
    res.status(201).json(savedPodcast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/updatewatermark").post(upload.single('file'), async (req,res)=>{
  try {
    const { email } = req.body.email; // Assuming you have a userId to identify the user

    // Find the user by the userId
    const user = await User.findById(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the watermark property with the new filename
    user.water_mark = req.file.filename;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/feed").get( async (req, res) => {
  try {
    const getPosts = await Posts.find();
    res.json(getPosts);
   
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

router.route("/:filename").get((req,res)=>{
  const {filename}=req.params
  console.log(__dirname)
  const imagePath=path.join(__dirname,"..","uploads",filename)
  console.log(imagePath)
  res.sendFile(imagePath)
  // res.send("ok")
})
export default router
