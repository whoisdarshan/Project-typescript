import ProductService from "../../services/user/product.service"
const productservice=new ProductService();
import { Request,Response } from "express";

export const getproduct=async(req:Request,res:Response)=>{
    try {
        let product = await productservice.getProduct(req.body.productId)
        if(!product){
            return res.json({message:"Product is not found."})
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllProducts=async(req:Request,res:Response)=>{
    try {
        let product = await productservice.getAllPoducts({isDelete:false})
        if(!product){
            return res.json({message:"Product is not found."})
        }
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}