import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { creaetokenAndSaveCookie } from "../utils/generateTken.js";

export const signup = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({message:"user already registered"})
        }
        const hashPassword  = await bcrypt.hash(password,10)
        const newuser = new userModel({
            email,
            password:hashPassword
        })
        await newuser.save()
        if(newuser){
            creaetokenAndSaveCookie(newuser._id,res)
            console.log("user created successfully")
            return res.status(200).json({message:"user registered successfully",newuser:{
                _id:newuser._id,
                email:newuser.email
            }})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    try {
        const isMatch = bcrypt.compare(password,user.password)
        if(!user||!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        creaetokenAndSaveCookie(user._id,res)
        console.log("user signed in successfully")
        return res.status(200).json({message:"user logged in successfully",user:{
            _id:user._id,
            email:user.email
        }})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(201).json({message:"user logout successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).jons({message:"internal server error"})
    }
}