import {
  createCommentToPost,
  deleteCommentFromPost,
  getCommentsFromPost,
} from './../controllers/comment';
import express from 'express';

export const commentRouter = express.Router();

commentRouter.get('/:postId/all', getCommentsFromPost);
commentRouter.post('/:postId', createCommentToPost);
commentRouter.delete('/:postId/:commentId/', deleteCommentFromPost);
