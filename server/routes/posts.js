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
    try{
      const post = new Posts({
        title: req.body.title,
        description: req.body.description,
        amt: req.body.amt,
        art_image: req.file.filename,
      })

      const savedPost = await post.save()
      res.status(200).send(JSON.stringify({'message': 'Posted!'}))
    } catch(error){
      res.status(500).send(JSON.stringify({'message': 'Internal server error'}))
    }
})

export default router
