import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { ACCESS_TOKEN } from '../config/config';
import jwt from 'jsonwebtoken';
import { PublicUser } from '../types/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
  // check if IDs from Prisma are malformatted
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2023') {
      status = 400;
      errorMessage = 'Malformatted ID';
    }
  }
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
  // User must be registered or logged in to access API endpoint.
  // If token is tampered/unverified, return invalid
  if (!token) {
    return next(createHttpError(401, 'Please login or register.'));
  }
  jwt.verify(token, ACCESS_TOKEN as string, (err, decoded) => {
    if (!decoded) return next(createHttpError(403, 'Invalid Token'));
    const user = {
      id: (decoded as PublicUser).id,
      username: (decoded as PublicUser).username,
      email: (decoded as PublicUser).email,
    };
    req.user = user;
  });
  // const decoded = jwt.verify(token, ACCESS_TOKEN as string) as PublicUser;
  // if (!decoded) return next(createHttpError(403, 'Invalid Token'));
  // const user = {
  //   id: decoded.id,
  //   username: decoded.username,
  //   email: decoded.email,
  // };
  // req.user = user;
  next();
};
