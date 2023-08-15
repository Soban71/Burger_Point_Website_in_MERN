import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import { getAdminOrder, getOrderDetails, getmyOrders, placeOrder, placeOrderOnline, processOrder } from '../controller/order.js';
 
const router = express.Router();

 router.post("/createdOrder",placeOrder)

 router.get("/myorders",isAuthenticated,getmyOrders);

 router.get("/order/:id",isAuthenticated,getOrderDetails);

//Will add admin middleware
 router.get("/admin/orders",isAuthenticated,authorizeAdmin,getAdminOrder);


 router.get("/admin/order/:id",isAuthenticated,authorizeAdmin,processOrder);


 router.post("/createOrderonline",placeOrderOnline)
export default router;

