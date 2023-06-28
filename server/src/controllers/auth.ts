import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import { signAccessToken } from '../utils/signJWT';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, passConfirm } = req.body;
  if (!username || !email || !password) {
    throw createHttpError(403, 'Please provide all fields');
  }
  if (password !== passConfirm) {
    throw createHttpError(403, 'Passwords do not match');
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const userForToken = await db.user.create({
    data: {
      username,
      email,
      password: passwordHash,
    },
  });
  signAccessToken(res, userForToken);
  res.json({ message: 'Successfully registered!' });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.user.findMany();
  res.json(users);
};

export const getRandom = (req: Request, res: Response) => {
  return res.send('hello for private route');
};
