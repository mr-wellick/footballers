import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { userRouter } from './services';

// app initialization
config();
const app = express();
const redisStore = connectRedis(session);
const redisClient = redis.createClient();

// add session management
app.use(
  session({
    secret: 'hit',
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient,
    }),
    saveUninitialized: false,
    resave: false,
  })
);

// add base middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', userRouter);

export default app;
