const promiseUtil = (promise) =>
  promise.then((res) => [undefined, res]).catch((err) => [err]);

export default promiseUtil;
