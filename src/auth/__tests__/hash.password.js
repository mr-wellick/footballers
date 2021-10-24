import hashPassword from '../hash.password';

test('successfully hash user password', async () => {
  const userPassword = '12345678';
  const [err, encryptedPassword] = await hashPassword(userPassword);

  expect(err).toBe(undefined);
  expect(encryptedPassword).not.toBe(userPassword);
});

test('failing to hash user password', async () => {
  const userPassword = undefined;
  const [err, encryptedPassword] = await hashPassword(userPassword);

  expect(err).not.toBe(undefined);
  expect(encryptedPassword).toBe(undefined);
});
