import express from 'express'
// import { AdminVerifyToken } from '../../helpers/verifyToken'
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../../controller/admin/product.controller'
import upload from '../../helpers/imageUpload'

const productRoute=express.Router();

productRoute.post('/add-product',upload.single('productImage'),addProduct)
productRoute.get('/get-product',upload.none(),getProduct)
productRoute.get('/get-All-product',upload.none(),getAllProducts);
productRoute.put('/update-product',upload.single('productImage'),updateProduct);
productRoute.delete('/delete-product',upload.none(),deleteProduct);

export default productRoute