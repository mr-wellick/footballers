import promiseUtil from '../promise.util.js';

test('after a successful api call, err should be null and data should be a valid value to work with', async () => {
  const [err, data] = await promiseUtil(
    new Promise((resolve) => {
      resolve('this is my response data');
    })
  );

  expect(err).toBe(null);
  expect(data).toBe('this is my response data');
});

test('after an unsuccessful api call, err should not be null and data should be undefined', async () => {
  const [err, data] = await promiseUtil(
    new Promise((resolve, reject) => {
      reject('this is my error');
    })
  );

  expect(err).toBe('this is my error');
  expect(data).toBe(undefined);
});
