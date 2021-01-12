import { db } from './db.js';
import chalk from 'chalk';
import app from './app.js';

const port = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  return console.log('connected as id ' + db.threadId);
});

app.listen(port, () => {
  console.log(chalk.cyan(`Listening on port: ${port}`));
});
