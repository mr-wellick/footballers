import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import footballersRouter from './services/footballers/footballers.router.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app: Application = express();
const __dirname = fileURLToPath(import.meta.url);

app.set('views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/footballers', footballersRouter);
app.get('/', (_: Request, res: Response) => {
  res.render('home');
});

export default app;
