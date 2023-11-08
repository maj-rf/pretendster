import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../config/config';
import { Response } from 'express';
import { PublicUser } from '../types/types';

export const signAccessToken = (res: Response, payload: PublicUser) => {
  const token = jwt.sign(payload, ACCESS_TOKEN as string, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
  });
};
