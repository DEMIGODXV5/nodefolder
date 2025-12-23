//controllers are user for handling the requests and responses

// whenever we use User(capital U) it refers to the model we created in user.model.js. but whenever we use user(small u) it refers to the instance of the model ie single user document
import bcrypt from "bcryptjs";// for hashing the password

import {User} from "../models/user.model.js";// importing the User model from user.model.js

const registerUser=async(req,res) => {
    try {
        console.log("req body:",req.body);
        const { username, password, email } = req.body;// extracting username,password and email from the request body

        if(!username || !password || !email){
            return res.status(400).json({ message: "All fields are required" });// if any field is missing, return 400 status with message
        }

        const existinguser = await User.findOne({email:email.toLowerCase() });
        if(existinguser){
            return res.status(400).json({ message: "User with this email already exists" });// if user with this email already exists, return 409 status with message
        }
        const hashedPassword= await bcrypt.hash(password,10);// hashing the password with salt rounds of 10

        const user=await User.create({
            username,
            email:email.toLowerCase(),
            password:hashedPassword,
            loggedIn:false,
        })

        res.status(201).json({ // these things will come in the response body
            message:"user registered successfully",
            user:{id:user._id,email:user.email , username:user.username}
        })
    } catch (error) {
        console.error("register error:",error);
        res.status(500).json({ message: "Internal Server Error", error:error.message,});// if any error occurs, return 500 status with message
    }
};



const loginUser=async(req,res) => {
    // login user logic will go here
    try {
        //check if user alreafy exists
        const{email,password}=req.body;

        //1 validate input
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        //2 to find user
        const user=await User.findOne({
            email:email.toLowerCase(),
        });
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        //3 compare password
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }

        //4 login success
        res.status(200).json({
            message:"Login successful",
            user:{id:user._id,email:user.email,username:user.username},
        });

    } catch (error) {
        console.error("login error:",error);
        res.status(500).json({message:"Internal Server Error",error:error.message,});
    }
};


const logoutUser=async(req,res) => {
    // logout user logic will go here
    try {
        const{email}=req.body;

        const user=await User.findOne({email:email.toLowerCase()});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        // if user found, proceed to logout
        res.status(200).json({message:"Logout successful"});

    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message,});
    }
}
export{
    registerUser,// we need to export the constants so that we can use them in other files
    loginUser,
    logoutUser, 
}