import { query } from '../db.js';
import { promiseUtil } from '../utilities/index.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../auth/index.js';

const insertUser = async (body) => {
  const { userEmail, userPassword } = body;
  const userId = uuidv4();
  const [hashedError, hashedPassword] = await hashPassword(
    userPassword
  );

  if (hashedError) {
    return [hashedError, hashedPassword];
  }

  const sql = `INSERT INTO poc_config.users (user_id, user_email, user_password) VALUES ('${userId}', '${userEmail}', '${hashPassword}');`;
  const [insertUserError, user] = await promiseUtil(query(sql));

  return [insertUserError, user];
};

export default insertUser;
