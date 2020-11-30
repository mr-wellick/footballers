import hashPassword from '../hash.password';

test('successfully hash user password', async () => {
  const user_password = '12345678';
  const [err, encryptedPassword] = await hashPassword(user_password);

  expect(err).toBe(undefined);
  expect(encryptedPassword).not.toBe(user_password);
});

test('failing to hash user password', async () => {
  const user_password = undefined;
  const [err, encryptedPassword] = await hashPassword(user_password);

  expect(err).not.toBe(undefined);
  expect(encryptedPassword).toBe(undefined);
});
