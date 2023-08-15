import express from 'express';
import passport from 'passport';
import { Logout, getAdminUser, myProfile } from '../controller/user.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';



const router = express.Router();

router.get(
  '/googlelogin',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/login',
  passport.authenticate('google'),
  (req, res) => {
    res.send('Login Successfully');
  }
);

router.get('/me',isAuthenticated, myProfile);

router.get('/logout',Logout)


//User getting

router.get('/admin/user',isAuthenticated,authorizeAdmin,getAdminUser);

export default router;

