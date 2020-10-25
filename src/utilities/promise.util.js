const promiseUtil = (promise) =>
  promise.then((res) => [null, res]).catch((err) => [err]);

export default promiseUtil;
