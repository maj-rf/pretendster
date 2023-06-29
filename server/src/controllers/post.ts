import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';

export const createPost = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { content } = req.body;
  if (!content) throw createHttpError(401, 'Please provide all fields.');
  await db.post.create({
    data: {
      content: req.body.content,
      userId: id,
    },
  });
  res.json('Successfully created a post');
};

export const updatePost = async (req: Request, res: Response) => {
  const postID = req.params.id;
  const userID = req.user?.id;
  const { content } = req.body;
  const post = await db.post.findUnique({ where: { id: postID } });
  if (!post) throw createHttpError(400, 'Post not found');
  if (post.userId !== userID) throw createHttpError(403, 'Forbidden');
  if (!content) throw createHttpError(400, 'Please provide all fields');
  const updated = await db.post.update({
    where: { id: postID },
    data: { content },
  });
  res.json(updated);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await db.post.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  res.json(posts);
};

// TODO check for user not working, malformatted ID error
export const getUserPosts = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const posts = await db.post.findMany({
    where: { userId },
  });
  if (!posts) throw createHttpError(401, 'Cannot get posts');
  res.json(posts);
};
