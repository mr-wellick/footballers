import promiseUtil from '../promise.util.js';

test('after a successful api call, err should be undefined and data should be a valid value to work with', async () => {
  const [err, data] = await promiseUtil(
    new Promise((resolve) => {
      resolve('this is my response data');
    })
  );

  expect(err).toBe(undefined);
  expect(data).toBe('this is my response data');
});

test('after an unsuccessful api call, err should be a valid value to work with and data should be undefined', async () => {
  const [err, data] = await promiseUtil(
    new Promise((resolve, reject) => {
      reject(new Error('this is my error'));
    })
  );

  expect(err).toBe('this is my error');
  expect(data).toBe(undefined);
});
