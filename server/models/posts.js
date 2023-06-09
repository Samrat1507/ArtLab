import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  artist_name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  amt: { type: String },
  reportCount: {
    type: Number,
    default: 0,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  art_image: { type: String, required: true },
  apply_watermark: { type: Boolean, default: true },
});


var Posts = mongoose.model("Posts", postSchema);

export default Posts;
