import express from'express'
import {AdminVerifyToken} from '../../helpers/verifyToken'
import upload from '../../helpers/imageUpload'
import { changePassword, deleteprofile, getAdmin, login, signUp, updateprofile } from '../../controller/admin/admin.controller'


const adminRoute = express.Router()

adminRoute.post('/add-admin',upload.single('profileImage'),signUp)
adminRoute.post('/login',upload.none(),login)
adminRoute.put('/change-password',upload.none(),AdminVerifyToken,changePassword)
adminRoute.get('/get-profile',upload.none(),AdminVerifyToken,getAdmin)
adminRoute.put('/update-profile',upload.single('profileImage'),AdminVerifyToken,updateprofile)
adminRoute.delete('/delete-profile',upload.none(),AdminVerifyToken,deleteprofile)

export default adminRoute