import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import ProductService from "../../services/admin/product.service";
const productservcie= new ProductService();

declare global{
    namespace Express{
        interface Request{
            product?:any;
        }
    }
}

export const addProduct = async(req:Request,res:Response)=>{
    try {
        let product = await productservcie.getProduct({title: req.body.title,isDelete:false})
        if(product){
            return res.json({message:"Product is already added."})
        }
        let filepath:any;
        if(req.file){
            filepath = `${req.file.path}`
        }
        product=await productservcie.createProduct({...req.body,productImage:filepath});
        res.json({product,message:"Product added"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProduct = async(req:Request,res:Response)=>{
    try {
        let product = await productservcie.getProduct(req.body.productId)
        if(!product){
            return res.json({message:"This product in not added."})
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllProducts= async(req:Request,res:Response)=>{
    try {
        let product= await productservcie.getAllProducts({isDelete:false});
        if(!product){
            return res.json({message:"This product in not added."})
        }
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct=async(req:Request,res:Response)=>{
    try {
        let product = await productservcie.getProduct(req.body.productId)
        if(!product){
            return res.json({message:"This product in not found."})
        }
        let filepath:any;
        if(req.file){
            filepath = `${req.file.path}`
        };
        product=await productservcie.updateProduct(product._id,{...req.body,productImage:filepath,isDelete:false});
        res.json({product,message:"Product update success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct=async(req:Request,res:Response)=>{
    try {
        let product = await productservcie.getProduct(req.body.productId)
        if(!product){
            return res.json({message:"This product in not found."})
        }
        product=await productservcie.updateProduct(product._id,{isDelete:true});
        res.json({product,message:"Product delete success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}