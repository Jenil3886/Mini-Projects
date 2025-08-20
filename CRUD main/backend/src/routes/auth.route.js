import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();


// Register a new user
router.post("/register" , async(req , res ) => {
    try {
        const {name ,email , password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({message: "All filds are required"})
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,email,password: hashedPassword
        })
        
        return res.status(201).json({message: "User ragistered successfully " , user: { id: user.id , name: user.name , email: user.email}})
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

router.post("/login" , async(req, res) => {
    try {

        console.log("ggggfgdsfgfdgfg")
        const {email ,password} = req.body
        if(!email || ! password) {
            return res.status(400).json({message: "All Filds are required"})
        }

        const user = await User.findOne({where:{email}})
        

        if(!user) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = jwt.sign({id : user.id, email: user.email} , process.env.JWT_SECRET, {
            expiresIn: "8h"
        })

        if(!token) {
            return res.status(500).json({message: "server error"})
        }

        return res.status(200).json({
            message: "Login Successful",
            user: { id: user.id, name: user.name, email: user.email },
            token: token
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error"  , error: error.message});
    }
})

export default router;