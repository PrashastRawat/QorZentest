import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js"
import Student from "../models/Student.js"

export const signUp = async (req, res, next)=>{
    try {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            const error = new Error("Email already exists");
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({name, email, password: hashedPassword})
        await Student.create({ userId: newUser._id })

        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        res.status(201).json({
            success: true,
            message:"User called successfully",
            data:{
                token,
                user:{
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req,res,next)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data:{
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
        })
    }catch(error){
        next(error)
    }
}

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (user.role !== "admin") {
      const error = new Error("Access denied - admin only");
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};