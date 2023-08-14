import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';

export const createPost = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { content } = req.body;
  if (!content) throw createHttpError(401, 'Please provide all fields.');
  await db.post.create({
    data: {
      content: req.body.content,
      userId: userId,
    },
  });
  res.json({ message: 'Successfully created a post' });
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { content } = req.body;
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(401, 'Post not found');
  if (post.userId !== userId) throw createHttpError(403, 'Forbidden');
  if (!content) throw createHttpError(400, 'Please provide all fields');
  const updated = await db.post.update({
    where: { id: postId },
    data: { content },
  });
  res.json(updated);
};

export const updateLike = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(401, 'Post not found');
  if (post.userId !== userId) throw createHttpError(403, 'Forbidden');
  if (post.likes.includes(userId)) {
    await db.post.update({
      where: { id: postId },
      data: {
        likes: post.likes.filter((id) => id !== userId),
      },
    });
    return res.json({ message: 'Unliked!' });
  }

  await db.post.update({
    where: { id: postId },
    data: { likes: post.likes.concat(userId) },
  });
  res.json({ message: 'Liked!' });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await db.post.findMany({
    include: {
      user: {
        select: {
          username: true,
          profileImg: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(posts);
};

export const getUserPosts = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw createHttpError(401, 'User not found');
  const posts = await db.post.findMany({
    where: { userId },
  });
  if (!posts) throw createHttpError(401, 'Cannot get posts');
  res.json(posts);
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) throw createHttpError(401, 'Post not found');
  if (post.userId !== userId) throw createHttpError(403, 'Forbidden');

  await db.comment.deleteMany({ where: { postId } });
  await db.post.delete({ where: { id: postId } });

  res.json({ message: 'Post deleted' });
};
