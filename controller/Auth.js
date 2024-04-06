import jwt from "jsonwebtoken";
import userModel from "../model/UserModel.js"
import bcrypt from "bcryptjs"
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(200).json({
                "status":false,
                "message":"Email and Password is required."
            });
        }

        const user=await userModel.findOne({email:email});
        if(user){
            const isValid= await bcrypt.compare(password,user.password);
            if(isValid){
                const token=jwt.sign(
                    {
                        "email":user.email,
                        "id":user._id
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn:process.env.EXPIRES_IN
                    }
                )
                return res.status(200).json({
                    "status":true,
                    "data":user,
                    "token":token,
                    "message": "Login successful."
                })
            }else{
                return res.status(200).json({
                    "status": false,
                    "message": "Wrong password."
                })
            }
        }else{
            return res.status(200).json({
                "status": false,
                "message": "Email not found."
            })
        }
    } catch (error) {
        return res.status(200).json({
            "status": false,
            "message": error.message
        })
    }
}

export const register=async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;
        if(!fullname || !email || !password) {
            return res.status(200).json({
                "status":false,
                "message":"Invalid parameters.!!"
            });
        }
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(200).json({
                "status":false,
                "message":"Email already exists."
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        var newUser=await userModel({
            "fullname":fullname,
            "email":email,
            "password":hashedPassword
        })
        var user=await newUser.save();
        return res.status(201).json({
            "status": true,
            "message": "Registration successful.",
            "data":user
        })
    } catch (error) {
        return res.status(200).json({
            "status": false,
            "message": error.message
        })
    }
}


export const profile=async(req,res)=>{
    try {
        const userDetails=await userModel.findOne({_id:req.user.id});
        return res.status(400).json({
            'status':true,
            "data":userDetails,
            "message":"Profile fetched successfully."
        })
    } catch (e) {
        return res.status(400).json({
            'status':false,
            "message":e.message
        })
    }
}