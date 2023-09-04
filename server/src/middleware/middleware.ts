import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { ACCESS_TOKEN } from '../config/config';
import jwt from 'jsonwebtoken';
import { PublicUser } from '../types/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { uploadToCloud } from '../utils/uploadConfig';
import { bufferToDataURI } from '../utils/uploadConfig';

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
  const token = req.cookies.jwt as string;
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
      profileImg: (decoded as PublicUser).profileImg,
    };
    req.user = user;
  });

  next();
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { file } = req;
  if (!file) {
    res.locals.imageDetails = null;
    return next();
  }

  const fileFormat = file.mimetype.split('/')[1];
  const { base64 } = bufferToDataURI(fileFormat, file.buffer);
  const imageDetails = await uploadToCloud(base64, fileFormat);
  res.locals.imageDetails = imageDetails;

  next();
};
