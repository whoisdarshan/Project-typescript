import user from "../model/user_model";

export default class Userservice{
    getUser = async (body:any) => {
        return await user.findOne(body);
    }

    addNewUser=async (body:any)=>{
        return await user.create(body);
    }

    updateUser=async(id:any,body:any)=>{
        return await user.findByIdAndUpdate(id,{$set:body},{new:true});
    }
}