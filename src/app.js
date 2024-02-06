import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { footballersRouter } from './services/footballers/index.js';

const app = express();

// add base middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/footballers', footballersRouter);

export default app;
