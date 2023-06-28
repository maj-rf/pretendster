import express, { Request, Response } from 'express';
import 'express-async-errors';
import * as middleware from './middleware/middleware';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.use('/api/auth', authRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
export default app;
