import mongoose from "mongoose"
import bycrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            train: true,
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false,
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema)

export default User;