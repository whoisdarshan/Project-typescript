import favourite from "../../model/favourite.model";

export default class favouriteService{
    checkFavourite  = async(body:any)=>{
        return favourite.findOne(body);
    }

    addFavourite=async(body:any)=>{
        return favourite.create(body);
    }

    getAllFavourite=async(body:any)=>{
        return  favourite.find(body)
    }

    deletefavourite=async(id:any,body:any)=>{
        return favourite.findByIdAndDelete(id,{$set:body},{new:true});
    }
}