import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { footballersRouter } from './services/footballers/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/footballers', footballersRouter);
app.use('/', (req, res) => {
  return res.status(200).send('<p>hello, world</p>');
});

export default app;
