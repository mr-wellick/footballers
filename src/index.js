import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import { config } from 'dotenv';
import { db } from './db.js';
import { dropTable, createTable } from './create-db.js';
import { footballersRouter } from './footballers/';

// app initialization
config();
const port = process.env.PORT || 5000;
const app = express();

// add base middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  return console.log('connected as id ' + db.threadId);
});

dropTable();
createTable();

// user route
app.use('/api/v1', footballersRouter);

// listen to server
app.listen(port, () => {
  console.log(chalk.cyan(`Listening on port: ${port}`));
});
