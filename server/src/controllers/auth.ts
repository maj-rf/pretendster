import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import { signAccessToken } from '../utils/signJWT';
import { excludePass } from '../utils/excludePass';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, passConfirm } = req.body;
  if (!username || !email || !password) {
    throw createHttpError(401, 'Please provide all fields');
  }
  if (password !== passConfirm) {
    throw createHttpError(401, 'Passwords do not match');
  }
  const emailExists = await db.user.findUnique({ where: { email } });
  if (emailExists) throw createHttpError(400, 'Email is already in use.');
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await db.user.create({
    data: {
      username,
      email,
      password: passwordHash,
      followingIDs: [
        '64bdd46f54522d04587b8cd3',
        '64e2ba2b2970f3eb62f2c2ce',
        '64b4960c850a33c43d2faa65',
      ],
    },
  });

  await db.user.updateMany({
    where: {
      OR: [
        { id: '64bdd46f54522d04587b8cd3' },
        { id: '64e2ba2b2970f3eb62f2c2ce' },
        { id: '64b4960c850a33c43d2faa65' },
      ],
    },
    data: { followerIDs: { push: user.id } },
  });
  signAccessToken(res, {
    username: user.username,
    id: user.id,
    email: user.email,
    profileImg: user.profileImg,
  });
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    profileImg: user.profileImg,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw createHttpError(401, 'Please provide all fields');
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  const passwordCorrect = user
    ? await bcrypt.compare(password, user.password)
    : false;
  if (!user || !passwordCorrect)
    throw createHttpError(401, 'Incorrect email or password.');
  signAccessToken(res, {
    username: user.username,
    id: user.id,
    email: user.email,
    profileImg: user.profileImg,
  });
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    profileImg: user.profileImg,
  });
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) throw createHttpError(401, 'No JWT');
  res
    .cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: 'Successfully logged out!' });
};

export const getAuthUser = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const currentUser = await db.user.findUnique({
    where: { id: userId },
    select: excludePass,
  });
  if (!currentUser) throw createHttpError(401, 'User not found');
  res.json(currentUser);
};
