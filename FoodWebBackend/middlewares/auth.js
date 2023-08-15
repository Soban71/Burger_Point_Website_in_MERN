import ErrorHandle from "../utils/Errorhandle.js";
export const isAuthenticated=(req,res,next)=>{
    const token=req.cookies["connect.sid"];

   // console.log(token);

    if(!token){
       
            return next(new ErrorHandle("Not Login " , 401))
        
    }


    next();

}


export const authorizeAdmin=(req,res,next)=>{
   

    if(req.user.role!=="admin"){
       
            return next(new ErrorHandle("Ony Admin Allowed" , 405))
        
    }

    next();

}