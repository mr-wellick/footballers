import { db } from '../db.js';
import { promiseUtil } from '../utilities';
import { v4 as uuidv4 } from 'uuid';
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const userRegister = async (req, res) => {
  const { user_email, user_password } = req.body;
  const user_id = uuidv4();
  const sql = `INSERT INTO poc_config.users (user_id, user_email, user_password) VALUES ('${user_id}', '${user_email}', '${user_password}');`;

  const [err] = await promiseUtil(query(sql));

  if (err) {
    return res.status(400).send('Failed to create account');
  }

  const user = {
    user_email,
    user_id,
  };

  res.status(200).send(user);
};
