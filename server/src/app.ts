import express, { Request, Response } from 'express';
import 'express-async-errors';
import * as middleware from './middleware/middleware';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { commentRouter } from './routes/comment';
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', middleware.verifyJWT, userRouter);
app.use('/api/v1/posts', middleware.verifyJWT, postRouter);
app.use('/api/v1/comments', middleware.verifyJWT, commentRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
export default app;
