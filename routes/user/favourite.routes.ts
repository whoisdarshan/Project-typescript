import express from 'express'
import upload from '../../helpers/imageUpload'
import { UserVerifyToken } from '../../helpers/verifyToken'
import { addfavourite, getAllFavourite, getFavourite } from '../../controller/user/favourite.controller'
const favouriteRoute=express.Router()


favouriteRoute.post('/add-favourite',upload.none(),UserVerifyToken,addfavourite)
favouriteRoute.get('/get-favourite',upload.none(),UserVerifyToken,getFavourite)
favouriteRoute.get('/get-All-favourite',upload.none(),UserVerifyToken,getAllFavourite)




export default favouriteRoute