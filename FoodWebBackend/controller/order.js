import { asyncError } from "../middlewares/ErrormiddleWare.js";
import { Order } from "../models/Order.js";
import ErrorHandle from "../utils/Errorhandle.js";
import {instance} from '../server.js';

export const placeOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    TotalAmount
  } = req.body;

  const user = "req.user._id"; // Make sure req.user is correctly populated with user information

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    TotalAmount,
    user
  };

  try {
    const order = new Order(orderOptions); // Create a new instance of Order

    // Assign the user information to the order's user field
    order.user = user;

    await order.save(); // Save the order

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully via cash"
    });
  } catch (err) {
    console.log(err);
  }
};





export const placeOrderOnline = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    TotalAmount
  } = req.body;

  const user = "req.user._id"; // Make sure req.user is correctly populated with user information

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    TotalAmount,
    user
  };
  const options = {
    amount: Number(TotalAmount)*100,  // amount in the smallest currency unit
    currency: "INR",
  };

  const order=await instance.orders.create(options)


    res.status(201).json({
      success: true,
     order,orderOptions
    });
   
};



export const getmyOrders=asyncError(async(req,res,next)=>{
  const orders=await Order.find({
    user:req.user._id,
  }).populate("user","name");

  res.status(200).json({
    success:true,
    orders
  })
})

export const getOrderDetails=asyncError(async(req,res,next)=>{

  const order=await Order.findById(req.params.id).populate("user","name");

  if(!order) return next(new ErrorHandle("Invalid Order id",404));

  res.status(200).json({
    success:true,
    order
  })
})



export const getAdminOrder=asyncError(async(req,res,next)=>{
  const orders=await Order.find({}).populate("user","name");

  res.status(200).json({
    success:true,
    orders
  })
})


export const processOrder=asyncError(async(req,res,next)=>{
  
  const order=await Order.findById(req.params.id);

  if(!order) return next(new ErrorHandle("Invalid Order id",404));

  if(order.orderStatus==="preparing")  order.orderStatus="Shipped";
  
  else if(order.orderStatus==="Shipped"){
    order.orderStatus="Delivered";
    order.deliveredAt=new Date(Date.now());
  }
  else if(order.orderStatus==="Delivered")
  return next(new ErrorHandle("Food Already Delivered",400));


  await order.save();

  res.status(200).json({
    success:true,
    message:"Status Updated Successfully"
  });
});