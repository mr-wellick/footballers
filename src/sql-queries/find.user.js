import client from '../db.js';
import { promiseUtil } from '../utilities/index.js';

const findUser = async (body) => {
  const { userEmail } = body;
  const sql = `SELECT * FROM users WHERE user_email='${userEmail}'`;
  const [err, user] = await promiseUtil(client.query(sql));

  return [err, user];
};

export default findUser;
