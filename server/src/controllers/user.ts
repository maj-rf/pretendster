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

export const updateProfilePic = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // check if user owns the profile
  if (userId !== req.user.id) throw createHttpError(403, 'Forbidden');
  // check if user exists
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw createHttpError(401, 'User not found');
  const updated = await db.user.update({
    where: { id: userId },
    data: {
      profileImg: res.locals.imageDetails?.url,
    },
  });
  res.status(201).json(updated.profileImg);
};

export const getUsers = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const users = await db.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    include: {
      posts: true,
    },
  });
  res.json(users);
};

export const followUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const yourId = req.user.id;
  const currentUser = await db.user.findUnique({ where: { id: yourId } });
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!currentUser) throw createHttpError(401, 'User not found');
  if (!user) throw createHttpError(401, 'Invalid User');
  // update currentUser's following and user's followers
  await db.user.update({
    where: { id: currentUser.id },
    data: { followingIDs: currentUser.followingIDs.concat(user.id) },
  });
  await db.user.update({
    where: { id: user.id },
    data: { followerIDs: user.followerIDs.concat(currentUser.id) },
  });
  res.json(currentUser);
};

export const unfollowUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const yourId = req.user.id;
  const currentUser = await db.user.findUnique({ where: { id: yourId } });
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!currentUser) throw createHttpError(401, 'User not found');
  if (!user) throw createHttpError(401, 'Invalid User');
  await db.user.update({
    where: { id: currentUser.id },
    data: {
      followingIDs: currentUser.followingIDs.filter((id) => id !== userId),
    },
  });
  await db.user.update({
    where: { id: user.id },
    data: {
      followerIDs: user.followerIDs.filter((id) => id !== yourId),
    },
  });
  res.json(currentUser);
};
