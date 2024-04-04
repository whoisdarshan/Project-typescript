const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productImage:{type:String},
    title:{type:String ,unique:true},
    description:{type:String},
    price:Number,
    category:[{
        type:String
    }],
    isDelete:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
})

const product = mongoose.model('products',productSchema)
export default product