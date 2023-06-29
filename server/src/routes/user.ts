import express from 'express';
import { getProfile, getUsers, updateProfile } from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/profile', getProfile);
userRouter.get('/all', getUsers);
userRouter.patch('/profile/:id', updateProfile);
