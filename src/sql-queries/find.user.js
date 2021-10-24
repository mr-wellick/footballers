import { query } from '../db.js';
import { promiseUtil } from '../utilities/index.js';

const findUser = async (body) => {
  const { user_email } = body;
  const sql = `SELECT * FROM poc_config.users WHERE user_email='${user_email}'`;
  const [err, user] = await promiseUtil(query(sql));

  return [err, user];
};

export default findUser;
