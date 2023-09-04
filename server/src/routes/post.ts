import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  updateLike,
  updatePost,
} from '../controllers/post';
import { upload } from '../utils/uploadConfig';
import { uploadImage } from '../middleware/middleware';
export const postRouter = express.Router();

postRouter.get('/all', getAllPosts);
postRouter.get('/all/:userId', getUserPosts);
postRouter.post('/post', upload.single('image'), uploadImage, createPost);
postRouter.patch('/post/like/:postId', updateLike);
postRouter.patch('/post/:postId', updatePost);
postRouter.delete('/post/:postId', deletePost);
