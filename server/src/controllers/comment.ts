import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';

export const createCommentToPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { content } = req.body;
  if (!content) throw createHttpError(401, 'Please fill all fields.');
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(400, 'Post not found');
  const comment = await db.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });

  res.json(comment);
};

export const getCommentsFromPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(400, 'Post not found.');
  const comments = await db.comment.findMany({ where: { postId } });
  if (!comments) throw createHttpError(400, 'Comments not found.');
  res.json(comments);
};
