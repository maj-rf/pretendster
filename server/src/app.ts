import express, { Request, Response } from 'express';
import 'express-async-errors';
import * as middleware from './middleware/middleware';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { commentRouter } from './routes/comment';
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(limiter);

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
