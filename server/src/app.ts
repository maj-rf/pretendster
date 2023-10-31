import express, { Request, Response } from 'express';
import 'express-async-errors';
import * as middleware from './middleware/middleware';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { commentRouter } from './routes/comment';
import { CLOUD_NAME } from './config/config';
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'"],
        'style-src': ["'self'"],
        imgSrc: [
          "'self'",
          'blob:',
          'data:',
          `https://res.cloudinary.com/${CLOUD_NAME}}/`,
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', middleware.verifyJWT, userRouter);
app.use('/api/v1/posts', middleware.verifyJWT, postRouter);
app.use('/api/v1/comments', middleware.verifyJWT, commentRouter);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (_req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html')),
  );
} else {
  app.get('/', (_req, res) => {
    res.json({ message: 'welcome to pretendster' });
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
export default app;
