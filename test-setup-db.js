import { db } from './src/db.js';

beforeAll(() => {
  jest.useFakeTimers();
  db.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    return console.log('connected as id ' + db.threadId);
  });
});

afterAll(() => {
  jest.useFakeTimers();
  db.destroy();
});
