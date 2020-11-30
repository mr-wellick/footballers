import findUser from '../find.user';

test('find an existing user by email', async () => {
  const body = {
    user_email: 'somename@gmail.com',
  };
  const [err, user] = await findUser(body);

  expect(err).toBe(undefined);
  expect(Object.keys(user[0]).length).toBe(3);
});

test('user email does not exist', async () => {
  const body = {
    user_email: '',
  };
  const [err, user] = await findUser(body);

  expect(err).toBe(undefined);
  expect(user.length).toBe(0);
});
