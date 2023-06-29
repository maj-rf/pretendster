import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import { signAccessToken } from '../utils/signJWT';

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw createHttpError(401, 'Please provide all fields');
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) throw createHttpError(401, 'Email not found.');
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.password)
    : false;
  if (!passwordCorrect) throw createHttpError(401, 'Incorrect password.');
  signAccessToken(res, {
    username: user.username,
    id: user.id,
    email: user.email,
  });
  res.json({ message: 'Successfully logged in!' });
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
