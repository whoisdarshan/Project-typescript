import { Request,Response } from "express"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import  AdminService from '../../services/admin/admin.service'
const adminservice=new AdminService();

declare global{
    namespace Express{
        interface Request{
            admin?:any;
        }
    }
}

export const signUp = async(req:Request,res:Response)=>{
    try {
        let admin = await adminservice.getAdmin({email:req.body.email,isDelete:false})
        if(admin){
            return res.json({message:"Admin is already register."})
        }
        let filepath:any
        if(req.file){
            filepath=  `${req.file.path}`
        }
        let hashPassword=await bcryptjs.hash(req.body.password,10)
        await adminservice.addAdmin({...req.body,password:hashPassword,profileImage:filepath})
        res.json({admin,message:"Admin Create account"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async(req:Request,res:Response)=>{
    try {
        let admin= await adminservice.getAdmin({email:req.body.email,isDelete:false})
        if(!admin){
            return res.json({message:"Admin is not register."})
        }
        let comparepassword= await bcryptjs.compare(req.body.password,admin.password);
        if(!comparepassword){
            return res.json({message:"Password is incorrect."})
        }
        let payLoad={
            adminId:admin._id
        }
        let token = jwt.sign(payLoad,'darshan')
        res.json({token,message:"Admin login success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const changePassword= async(req:Request,res:Response)=>{
    try {
        let {oldpassword,newpassword,confirmpassword}=req.body
        let admin= await adminservice.getAdmin(req.admin._id)
        if(!admin){
            return res.json({message:"Admin is not register"})
        }
        let comparepassword=await bcryptjs.compare(oldpassword,admin.password)
        if(!comparepassword){
            return res.json({message:"Password is incorrect"})
        }
        if(oldpassword==newpassword){
            return res.json({message:"OLD and NEW password are same."})
        }
        if(newpassword!=confirmpassword){
            return res.json({message:"NEW and CONFIRM  are not same. "})
        }
        let hashNewPassword= await bcryptjs.hash(newpassword,10)
        admin=await adminservice.updateAdmin(req.admin._id,{password:hashNewPassword,new:true})
        res.json({admin,message:"Password update success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAdmin=async(req:Request,res:Response)=>{
    try {
        let admin=req.admin
        if(!admin){
            return res.json({message:"Admin is not found"})
        }
        res.json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateprofile=async(req:Request,res:Response)=>{
    try {
        let admin=await adminservice.getAdmin(req.admin._id)
        let filepath:any;
        if(req.file){
            filepath = `${req.file.path}`
        }
        admin=await adminservice.updateAdmin(req.admin._id,{...req.body,profileImage:filepath});
        res.json({admin,message:"Update profile success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteprofile=async(req:Request,res:Response)=>{
    try {
        let admin=await adminservice.getAdmin(req.admin._id)
        if(!admin){
            return res.json({message:"Admin is not found"})
        }
        admin=await adminservice.updateAdmin(req.admin._id,{isDelete:true});
        res.json({admin,message:"Delete account success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}