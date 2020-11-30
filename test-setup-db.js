import { db, query } from './src/db.js';
import { promiseUtil } from './src/utilities/';

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
      'DELETE FROM poc_config.users WHERE user_email NOT IN("somename@gmail.com")'
    )
  );
});

afterAll(() => {
  jest.useFakeTimers();
  db.destroy();
});
