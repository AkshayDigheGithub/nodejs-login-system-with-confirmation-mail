import express from 'express';
import { userRouter } from './resorces/user'

export const restRouter = express.Router();

restRouter.use('/users', userRouter);