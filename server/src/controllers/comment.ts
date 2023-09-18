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
  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          username: true,
          profileImg: true,
        },
      },
    },
  });
  if (!comments) throw createHttpError(400, 'Comments not found.');
  res.json(comments);
};

export const deleteCommentFromPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.user.id;
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(401, 'Post not found');
  const comment = await db.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw createHttpError(401, 'Comment not found');
  if (comment.userId !== userId) throw createHttpError(403, 'Forbidden');
  await db.comment.delete({ where: { id: commentId } });
  res.json({ message: 'Deleted' });
};
