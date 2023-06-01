import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    artist_name: { type: String, unique: true, required: true },
    reportCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    profile_photo: {
        type: Buffer,
    },
    watermark_photo: {
        type: Buffer,
    }
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

var User = mongoose.model('User', userSchema);

export default User;