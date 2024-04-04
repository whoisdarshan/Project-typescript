import { Request,Response } from "express"
import favouriteService from "../../services/user/favourite.service"
const favouriteservice = new favouriteService();

declare global{
 namespace Express{
    interface Request{
        favourite?:any
    }
 }
}

export const addfavourite=async(req:Request,res:Response)=>{
    try {
        let favourite = await favouriteservice.checkFavourite({favouriteItem:req.body.favouriteItem,user:req.user._id})
        // console.log(favourite);
        
        if(favourite){
            await favouriteservice.deletefavourite(favourite._id,{isDelete:false})
            res.json({message:"unfavourite succesfull.",isFavourite:0})
        }
        favourite=await favouriteservice.addFavourite({user:req.user._id,...req.body})
        res.json({favourite,message:"add favourite success...",isFavourite:1});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getFavourite=async(req:Request,res:Response)=>{
    try {
        let favourite = await favouriteservice.checkFavourite({favouriteItem:req.body.favouriteItem,user:req.user._id})
        if(!favourite){
            return res.json({message:"Favourite is not found"})
        }
        res.json(favourite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllFavourite = async(req:Request,res:Response)=>{
    try {
        let favourite = await favouriteservice.getAllFavourite({user:req.user._id})
        if(!favourite){
            return res.json({message:"Favourite is not found"})
        }
        res.json(favourite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}