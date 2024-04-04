const mongoose = require ('mongoose')

const cartSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    cartItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    favouriteItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'favourites'
    },
    quantity:{type:Number,default:1},
    isDelete:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
})

const cart = mongoose.model('carts',cartSchema)

export default cart