import product from '../../model/product.model'

export default class ProductService{
    getProduct =async(body:any)=>{
        return product.findOne(body)
    };
    createProduct = async(body:any)=>{
        return product.create(body)
    };
    getAllProducts=async(body:any)=>{
        return  product.find(body)
    };
    updateProduct=async(id:any,body:any)=>{
        return product.findByIdAndUpdate(id,{$set:body},{new:true});
    }
}