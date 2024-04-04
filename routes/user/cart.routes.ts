import express from 'express'
const cartRoute=express.Router()
import upload from '../../helpers/imageUpload'
import { UserVerifyToken } from '../../helpers/verifyToken'
import { AddCart, deletecart, getallcarts, updateCart } from '../../controller/user/cart.controller'

cartRoute.post('/add-cart',upload.none(),UserVerifyToken,AddCart) 
cartRoute.get('/get-All-carts',upload.none(),UserVerifyToken,getallcarts)
cartRoute.put('/update-cart',upload.any(),UserVerifyToken,updateCart)
cartRoute.delete('/delete-cart',upload.none(),UserVerifyToken,deletecart)

export default cartRoute


