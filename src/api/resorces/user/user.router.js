import express from 'express';
import userController from './user.controller'

export const userRouter = express.Router();

userRouter.post('/user-sign-up', userController.signup);
userRouter.post('/user-login', userController.login);
userRouter.route('/get-all-users')
    .get(userController.getAllUser)