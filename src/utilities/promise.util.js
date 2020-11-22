const promiseUtil = (promise) =>
  promise
    .then((res) => [undefined, res])
    .catch((err) => [err, undefined]);

export default promiseUtil;
