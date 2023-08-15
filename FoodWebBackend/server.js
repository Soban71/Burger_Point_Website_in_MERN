import App from "./App.js"
import connectDb from './config/database.js'
import Razorpay from 'razorpay'


connectDb();

export const instance = new Razorpay({
    key_id: process.env.RazorPay_Api_id,
    key_secret: process.env.RazorPay_Api_secret
})

App.listen(process.env.PORT,()=>
    console.log(`Server is Running on port ${process.env.PORT}`)
);

//janjuasoban846
//Tbkdy6TCEi9P6Aih
