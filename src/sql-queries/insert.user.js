import { query } from '../db.js';
import { promiseUtil } from '../utilities/';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../auth/';

const insertUser = async (body) => {
  const { user_email, user_password } = body;
  const user_id = uuidv4();
  const [hashedError, hashedPassword] = await hashPassword(
    user_password
  );

  if (hashedError) {
    return [hashedError, hashedPassword];
  }

  const sql = `INSERT INTO poc_config.users (user_id, user_email, user_password) VALUES ('${user_id}', '${user_email}', '${hashedPassword}');`;
  const [insertUserError, user] = await promiseUtil(query(sql));

  return [insertUserError, user];
};

export default insertUser;
