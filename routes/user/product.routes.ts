import express from 'express'
const productRoutes = express.Router()
import upload from '../../helpers/imageUpload'
import { getAllProducts, getproduct } from '../../controller/user/product.controller'

productRoutes.get('/get-product',upload.none(),getproduct)
productRoutes.get('/get-All-products',getAllProducts);

export default productRoutes