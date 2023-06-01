import express from "express";
import multer from "multer";
import Posts from "../models/posts.js";


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

router.route("/feed").get((req,res )=>{
    //const token = req.headers[]
    res.send("OK");
})

router.route("/create").post(upload.single('file'), async (req,res)=>{
  try {
    const post = new Posts({
      title: req.body.title,
      description: req.body.description,
      amt: req.body.amt,
      artist_name: req.body.artist_name,
       // Use fileType instead of req.body.type
      
      art_image: req.file.filename,
    });

    const savedPodcast = await post.save();
    res.status(201).json(savedPodcast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router
