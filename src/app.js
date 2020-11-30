import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import { userRouter } from './services';

// app initialization
config();
const app = express();

// add base middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', userRouter);

export default app;
