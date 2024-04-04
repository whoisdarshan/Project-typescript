const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    favouriteItem :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    isDelete:{type:Boolean,default:false}
},
{
    versionKey:false,
    timestamps:true
})

const  favourite = mongoose.model('favourites',favouriteSchema)
export default favourite 