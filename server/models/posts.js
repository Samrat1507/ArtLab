import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  artist_name: { type: String, unique: true, required: true },
  title: { type: String, unique: true, required: true },
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

var Posts = mongoose.model("Posts", userSchema);

export default Posts;
