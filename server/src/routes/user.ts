import express from 'express';
import {
  getProfile,
  getUsers,
  unfollowUser,
  followUser,
  updateProfile,
} from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/all', getUsers);
userRouter.get('/profile/:userId', getProfile);
userRouter.patch('/profile/:userId', updateProfile);
userRouter.patch('/user/:userId/follow', followUser);
userRouter.patch('/user/:userId/unfollow', unfollowUser);
