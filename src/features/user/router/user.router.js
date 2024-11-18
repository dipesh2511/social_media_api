// all imports
import express from 'express';
import UserController from '../controller/user.controller.js';

// ALL varible initialization
let userRouter = express.Router();
let usercontroller = new UserController()
// all routes
userRouter.post('/register',usercontroller.registerUser)
userRouter.post('/sign-in',usercontroller.loginUser)

// exporting to main index file
export default userRouter;