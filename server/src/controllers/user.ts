import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const currentUser = await db.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });
  if (!currentUser) throw createHttpError(401, 'User not found');
  res.json(currentUser);
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // check if user owns the profile
  if (userId !== req.user.id) throw createHttpError(403, 'Forbidden');
  // check if user exists
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw createHttpError(401, 'User not found');
  // update
  const { username, location, status, bio } = req.body;
  const updated = await db.user.update({
    where: { id: userId },
    data: { username, location, status, bio },
  });
  res.json(updated);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await db.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json(users);
};
