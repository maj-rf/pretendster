import express from 'express';
import {
  getProfile,
  getUsers,
  unfollowUser,
  followUser,
  updateProfile,
  updateProfilePic,
  getSuggestions,
  searchUsers,
} from '../controllers/user';
import { upload } from '../utils/uploadConfig';
import { uploadImage } from '../middleware/middleware';

export const userRouter = express.Router();

userRouter.get('/all', getUsers);
userRouter.get('/suggestions', getSuggestions);
userRouter.get('/search/:search', searchUsers);
userRouter.get('/profile/:userId', getProfile);
userRouter.patch(
  '/profile/:userId/picture',
  upload.single('image'),
  uploadImage,
  updateProfilePic,
);
userRouter.patch('/profile/:userId', updateProfile);
userRouter.patch('/user/:userId/follow', followUser);
userRouter.patch('/user/:userId/unfollow', unfollowUser);
