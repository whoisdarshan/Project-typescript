import admin from '../../model/user_model'

export default class AdminService{
    getAdmin = async(body:any)=>{
        return admin.findOne(body);
    };

    addAdmin=async(body:any)=>{
        return admin.create(body);
    };

    updateAdmin = async(id:any,body:any)=>{
        return admin.findByIdAndUpdate(id,{$set:body},{new:true})
    };
}