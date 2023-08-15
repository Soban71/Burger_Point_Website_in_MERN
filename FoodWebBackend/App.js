import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectPassport } from './utils/provider.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middlewares/ErrormiddleWare.js';


const App=express();

export default App;

dotenv.config({
     path: "./config/config.env",
});

//session middleware
App.use(session({
     secret:process.env.session_secret,
    resave:false,
     saveUninitialized:false
}))

App.use(cookieParser());
App.use(express.json());
App.use(urlencoded({
     extended:true,
}))
App.use(passport.authenticate("session"));
App.use(passport.initialize());
App.use(passport.session());
App.use(errorMiddleWare);

connectPassport();


import userRoutes from './routes/user.js'
import orderRoute from './routes/Order.js'

App.use('/api/v1',userRoutes);
App.use('/api/v1',orderRoute);



