import product from '../../model/product.model'

export default class ProductService{
    getProduct=async(body:any)=>{
        return product.findOne(body);
    };

    getAllPoducts=async(body:any)=>{
        return product.find(body);
    }
}