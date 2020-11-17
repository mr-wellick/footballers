import { db } from './src/db.js';
import { promiseUtil } from './src/utilities/';
import util from 'util';

const query = util.promisify(db.query).bind(db);

beforeAll(async () => {
  jest.useFakeTimers();
  db.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    return console.log('connected as id ' + db.threadId);
  });

  await promiseUtil(
    query(
      'DELETE FROM poc_config.users WHERE user_email="newuser@gmail.com"'
    )
  );
});

afterAll(() => {
  jest.useFakeTimers();
  db.destroy();
});
