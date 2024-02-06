import { promiseUtil } from '../utilities/index.js';
//import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../auth/index.js';
import client from '../db.js';

const insertUser = async (body) => {
  const { user_email, user_password} = body;
  //const userId = uuidv4();
  const [hashedError, hashedPassword] =
    await hashPassword(user_password);

  if (hashedError) {
    return [hashedError, hashedPassword];
  }

  const sql = `INSERT INTO users (user_email, user_password) VALUES ('${user_email}', '${hashPassword}');`;
  const [insertUserError, user] = await promiseUtil(
    client.query(sql),
  );

  return [insertUserError, user];
};

export default insertUser;
