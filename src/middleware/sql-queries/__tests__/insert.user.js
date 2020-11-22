import insertUser from '../insert.user';
import { v4 as uuidv4 } from 'uuid';

test('successfully create a new user', async () => {
  const body = {
    user_email: `${uuidv4().split('-')[0]}@gmail.com`,
    user_password: '12345678',
  };
  const [err, user] = await insertUser(body);

  expect(err).toBe(undefined);
  expect(typeof user).toBe('object');
});
