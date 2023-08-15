import { asyncError } from "../middlewares/ErrormiddleWare.js";
import {User} from '../models/User.js'
export const myProfile=(req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
};


export const Logout=(req,res,next)=>
{
req.session.destroy((err)=>{
if(err)
return next(err);

res.clearCookie("connect.sid");

res.status(200).json({
    message:"LogOut"
})
})
}

export const getAdminUser=asyncError(async(req,res,nex)=>{
    const users=await User.find({})

    res.status(200).json({
        success:true,
        users,
    })
})