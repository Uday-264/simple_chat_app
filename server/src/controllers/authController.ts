import { Request,Response } from "express";
import prisma from "../utils/db.js";
import jwt from 'jsonwebtoken';
interface LoginData{
    name: any;
    email:string;
    provider:string;
    oauth_id:string;
    image?:string;
}
class AuthController {
    static async login(req:Request,res:Response){
        try {
            const body:LoginData=req.body;
            let user=await prisma.user.findUnique({
                where:{
                    email:body.email,
                }
            });
            
            if(!user){
                 user=await prisma.user.create({
                    data: body
                })
            };

            const jwtPayload={
                name:body.name,
                email:body.email,
                id:user.id
            }

            const token=jwt.sign(jwtPayload,process.env.JWT_SECRET,{expiresIn:"30d"});

            return res.status(201).json({
                message:"Login Successful",
                user:{
                    ...user,
                    token:`Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:'something went wrong!, please login again'
            })
        }
    }    
}

export default AuthController