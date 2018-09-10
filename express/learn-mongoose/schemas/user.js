const mongoose=require('mongoose');

const { Schema }=mongoose;
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    age:{
        type: Number,
        required: false,
    },
    married:{
        type: Boolean,
        required: false,
    },
    comment:String,
    createdAt:{
        type: Date,
        default:Date.now,
    },        
});


module.exports=mongoose.model('User',userSchema);