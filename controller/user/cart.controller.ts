import CartService from "../../services/user/cart.service";
const cartservice=new CartService();
import { Request ,Response} from "express";

declare global{
    namespace Express{
        interface Request{
            cart?:any
        }
    }
}

export const AddCart=async(req:Request,res:Response)=>{
    try {
        let cart = await cartservice.getCart({cartItem:req.body.cartItem,user:req.user._id,isDelete:false})
        // console.log(cart);
        if(cart){
            return res.json({message:"Cart is already added"})
        }
        cart= await cartservice.addCart({...req.body,user:req.user._id});
        res.json({cart,message:"Cart add success."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getallcarts=async(req:Request,res:Response)=>{
    try {
        let cart = await cartservice.getAllCarts({user:req.user._id})
        if(!cart){
            return res.json({mesage:"Cart is not found"})
        }
       let allcart=cart.map((item:any)=>({
        _id:item._id,
        user : req.user._id,
        cartItem: item.cartItem._id,
        title :item.cartItem.title,
        price:item.cartItem.price,
        productImage : item.cartItem.productImage,
        description : item.cartItem.description,
        category: item.cartItem.category,
        quantity : item.quantity
       }))
       res.json(allcart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCart=async(req:Request,res:Response)=>{
    try {
        let cart = await cartservice.getCart({cartItem:req.body.cartItem,user:req.user._id})
        // console.log({user:req.user._id});
        // console.log({cartItem:req.body.cartItem});
        
        if(!cart){
            return res.json({message:"Cart is not found"})
        }
        cart = await cartservice.updatecart(cart._id,{...req.body})
        res.json({cart,message:"Cart update success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });   
    }
}

export const deletecart=async(req:Request,res:Response)=>{
    try {
        let cart = await cartservice.getCart({cartItem:req.body.cartItem,user:req.user._id,isDelete:false})
        console.log(cart)
        if(!cart){
            return res.json({message:"Cart is not found"})
        }
        cart = await cartservice.updatecart(cart._id,{isDelete:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}