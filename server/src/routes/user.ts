import express from 'express';
import { getProfile, getUsers, updateProfile } from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/all', getUsers);
userRouter.get('/profile/:userId', getProfile);
userRouter.patch('/profile/:userId', updateProfile);
