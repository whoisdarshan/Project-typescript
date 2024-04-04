import User from '../model/user_model'
import {Request ,Response,NextFunction, request} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
            admin?:any;
        }
    }
}


export const  UserVerifyToken= async (request:Request,response:Response,next:NextFunction)=>{
    try {
        // let  secretKey :any=process.env.SECRET_KEY;
        // const token : any =request.headers['authorization']?.split(" ")[1];
        // let {userId} : any = jwt.verify(token,secretKey)
        // let user= await User.findOne({_id:userId,isAdmin:false});
        // request.user=user;
        // if(request.user){
        //     next();
        // }else{
        //     response.json({message:"Invalid user."})
        // }

        const authorized:any = request.headers['authorization'];
        if(typeof authorized !=='undefined')
        {
            let token = authorized.split(" ")[1];
            // console.log(token)
            const {userId}:any= jwt.verify(token,'darshan');  // darshan is a secret key ...
            // console.log(userId);
            request.user= await  User.findOne({_id : userId,isDelete : false});
            // console.log(request.user);
            request.user? next(): response.json({message:'Invalid user'});
        }
    } catch (error) {
        return response.status(500).json({message: "Invalide token"})
    }
}

export const AdminVerifyToken = async (request:Request,response:Response,next:NextFunction)=>{
    try {
            const authorized:any=request.headers['authorization'];
            if(typeof authorized !=='undefined'){
                let token = authorized.split(" ")[1]
                console.log(token)
                const {adminId}:any=jwt.verify(token,'darshan');
                request.admin=await User.findOne({_id:adminId,isDelete:false})
                request.admin?next():response.json({message:"Invalid admin"})
            }
    } catch (error) {
        return response.status(500).json({message: "Invalide token"})
    }
}


// exports.adminverifyToken = async (req,res,next)=>
// {
//     try {
//         const authorized = req.headers['authorization'];
//         if(typeof authorized !=='undefined')
//         {
//             let token = authorized.split(" ")[1];
//             // console.log(token)
//             const {adminId}= jwt.verify(token,'darshan');  // darshan is a secret key ...
//             // console.log(userId);
//             req.admin= await  user.findOne({_id : adminId,isDelete : false});
//             // console.log(req.user);
//             req.admin? next(): res.json({message:'Invalid user'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({message:"Internal Server Error in verify token. "})
//     }
// }i