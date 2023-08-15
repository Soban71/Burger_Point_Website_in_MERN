import mongoose from "mongoose";

const schema =  mongoose.Schema({

    name:String,
    photo:String,
    googleId:{
        type:String,
        require:true,
        unique:true
    },
    role:{
        type:"String",
        enum:['user','admin'],
        default:'user',
    },
    createdAt:{
        type: Date,
        default:Date.now,
    }
})

export const User=mongoose.model("User",schema);