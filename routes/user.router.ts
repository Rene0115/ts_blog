import express from 'express';
import UserController from '../src/controller/user.controller';

const userRouter = express.Router();

userRouter.post("/create", UserController.signup)
userRouter.post("/login", UserController.login)

export default userRouter;