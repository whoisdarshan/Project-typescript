import cart from '../../model/cart.model'

export default class CartService{
    getCart=async(body:any)=>{
        return cart.findOne(body)
    }
    addCart=async(body:any)=>{
        return cart.create(body);
    }
    getAllCarts=async(body:any)=>{
        return  cart.find(body).populate("cartItem").populate({
            path:'user',
            model:"users",
            select:"name email profileImage"
        })
    }
    updatecart=async(id:any,body:any)=>{
        return cart.findByIdAndUpdate(id,{$set:body},{new:true});
    }
    updateManyCart=async(user:any,body:any)=>{
        return cart.updateMany({user:user},{$set:body},{new:true});
    }
}