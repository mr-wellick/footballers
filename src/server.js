import chalk from 'chalk';
import app from './app.js';
import client from './db.js';
import {
  checkBeforeRunningQueries,
  createTable,
  dropTable,
  insertIntoTable,
} from './create-db.js';

const port = process.env.PORT || 5555;

async function connectToDB() {
  await client.connect();

  const insert = await checkBeforeRunningQueries();

  if (!insert) {
    await dropTable();
    await createTable();
    await insertIntoTable();
  }
}

await connectToDB();

app.listen(port, () => {
  console.log(chalk.cyan(`Listening on port: ${port}`));
});
