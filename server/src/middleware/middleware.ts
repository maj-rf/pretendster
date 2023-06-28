import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { ACCESS_TOKEN } from '../config/config';
import jwt from 'jsonwebtoken';
import { PublicUser } from '../types/types';
export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
  next();
};

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies.jwt;
  if (!token) {
    return next(createHttpError(401, 'Unauthorized. No JWT Token'));
  }
  const decoded = jwt.verify(token, ACCESS_TOKEN as string) as PublicUser;
  if (!decoded) return next(createHttpError(403, 'Invalid Token'));
  const user = {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
  };
  req.user = user;
  next();
};
