import bcrypt from 'bcrypt';
import { query } from '../db.js';
import { promiseUtil } from '../utilities';
import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import { findUser } from '../middleware/sql-queries/index.js';

const compare = util.promisify(bcrypt.compare);

export const userRegister = async (req, res) => {
  const { user_email, user_password } = req.body;
  const user_id = uuidv4();
  const sql = `INSERT INTO poc_config.users (user_id, user_email, user_password) VALUES ('${user_id}', '${user_email}', '${user_password}');`;

  const [err] = await promiseUtil(query(sql));

  if (err) {
    return res.status(400).send('create account error');
  }

  const user = {
    user_email,
    user_id,
  };

  return res.status(200).send(user);
};

export const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;
  const [foundUserError, foundUser] = await findUser(user_email);

  if (foundUser.length === 0 || foundUserError) {
    return res.status(404).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  const [passwordMatchErr, passwordMatch] = await promiseUtil(
    compare(user_password, foundUser[0].user_password)
  );

  if (!passwordMatch || passwordMatchErr) {
    return res.status(401).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  delete foundUser[0].user_password;
  return res.status(200).send(foundUser[0]);
};
