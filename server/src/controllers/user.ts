import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import { excludePass } from '../utils/excludePass';
import { deleteFromCloud } from '../utils/uploadConfig';
export const getProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const currentUser = await db.user.findUnique({
    where: { id: userId },
    select: excludePass,
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
    select: excludePass,
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
  // delete existing image from cloudinary if it exists
  if (user.profileImg.public_id !== 'default_lorelei_id') {
    deleteFromCloud(user.profileImg.public_id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updated = await db.user.update({
    where: { id: userId },
    data: {
      profileImg: {
        url: res.locals.imageDetails?.secure_url,
        public_id: res.locals.imageDetails?.public_id,
      },
    },
    select: excludePass,
  });
  res.status(201).json(updated.profileImg);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await db.user.findMany({
    select: excludePass,
  });
  res.json(users);
};

export const getSuggestions = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const users = await db.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: excludePass,
    take: 10,
  });
  res.json(users);
};

export const followUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const yourId = req.user.id;
  const currentUser = await db.user.findUnique({
    where: { id: yourId },
    select: excludePass,
  });
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
  const currentUser = await db.user.findUnique({
    where: { id: yourId },
    select: excludePass,
  });
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

export const searchUsers = async (req: Request, res: Response) => {
  const search = req.params.search;
  const users = await db.user.findMany({
    where: {
      username: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });
  res.json(users);
};
