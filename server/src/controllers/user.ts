import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';

export const getProfile = async (req: Request, res: Response) => {
  const profileID = req.user?.id;
  const currentUser = await db.user.findUnique({
    where: { id: profileID },
    include: { posts: true },
  });
  if (!currentUser) throw createHttpError(401, 'User not found');
  res.json(currentUser);
};

export const updateProfile = async (req: Request, res: Response) => {
  const profileID = req.params.id;
  if (profileID !== req.user?.id) throw createHttpError(403, 'Forbidden');
  const { email, username } = req.body;
  const updated = await db.user.update({
    where: { id: profileID },
    data: { email, username },
  });
  if (!updated) throw createHttpError(401, 'User not found');
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
