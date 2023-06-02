import express from "express";
import multer from "multer";
import Posts from "../models/posts.js";
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

router.route("/create").post(upload.single('file'), async (req,res)=>{
    try {
      const post = new Posts({
        title: req.body.title,
        description: req.body.description,
        amt: req.body.amt,
        artist_name: req.body.artist_name,
         // Use fileType instead of req.body.type
  
        art_image: req.file.filename,
      })

    const savedPodcast = await post.save();
    res.status(201).json(savedPodcast);
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
