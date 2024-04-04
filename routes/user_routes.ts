import express from "express";
import { changePassword, deleteProfile, getProfile, login, signUp, updateProfile } from '../controller/user_controller'
import { UserVerifyToken } from "../helpers//verifyToken";
import upload from "../helpers/imageUpload";

const userRoute = express.Router();

userRoute.post('/signUp', upload.single('profileImage'), signUp);
userRoute.post('/login',upload.none(),login);
userRoute.get('/get-profile', upload.none(),UserVerifyToken,getProfile);
userRoute.put('/update-profile', upload.single('profileImage'), UserVerifyToken,updateProfile);
userRoute.put('/change-password', upload.none(), UserVerifyToken,changePassword);
userRoute.delete('/delete-profile', upload.none(),UserVerifyToken,deleteProfile);

export default userRoute