import bcrypt from 'bcrypt';
import { db } from '../db.js';
import { promiseUtil } from '../utilities';
import { v4 as uuidv4 } from 'uuid';
import util from 'util';

const query = util.promisify(db.query).bind(db);
const compare = util.promisify(bcrypt.compare);

export const userRegister = async (req, res) => {
  const { user_email, user_password } = req.body;
  console.log(user_email, user_password);
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
  const { user_password } = req.body;
  const hashed_password = res.locals.user
    ? res.locals.user.user_password
    : undefined;

  if (!hashed_password) {
    return res.status(404).send('user does not exist');
  }

  const [err, passwordMatch] = await promiseUtil(
    compare(user_password, hashed_password)
  );

  if (err) {
    return res.status(500).send('password error');
  }

  if (!passwordMatch) {
    return res.status(401).send('wrong password');
  }

  delete res.locals.user.user_password;
  return res.status(200).send(res.locals.user);
};
