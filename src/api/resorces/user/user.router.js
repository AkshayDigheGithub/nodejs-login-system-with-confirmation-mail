import express from 'express';
import userController from './user.controller'
import passport from 'passport';

export const userRouter = express.Router();
const authenticateMiddleware = passport.authenticate('jwt', { session: false });
userRouter.post('/user-sign-up', userController.signup);
userRouter.post('/user-login', userController.login);
// 
userRouter.route('/me')
    .get(authenticateMiddleware, userController.authenticate)
    .put(authenticateMiddleware, userController.updateMe)
// 
userRouter.route('/get-all-users')
    .get(userController.getAllUser)