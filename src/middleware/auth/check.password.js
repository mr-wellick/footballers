import bcrypt from 'bcrypt';
import util from 'util';
import { db } from '../../db.js';
import { promiseUtil } from '../../utilities/';

const query = util.promisify(db.query).bind(db);
const compare = util.promisify(bcrypt.compare);

const checkPassword = async (req, res, next) => {
  const { user_email, user_password } = req.body;
  const sql = `SELECT user_password FROM poc_config.users WHERE user_email='${user_email}'`;
  const [userError, user] = await promiseUtil(query(sql));

  if (userError) {
    return res.status(500).send('user error');
  }

  let hashed_password;
  if (user.length === 1) {
    hashed_password = user[0].user_password;
  }

  const [passwordError, passwordMatch] = await promiseUtil(
    compare(user_password, hashed_password)
  );

  if (passwordError) {
    return res.status(500).send('password error');
  }

  if (!passwordMatch) {
    return res.status(401).send('wrong password');
  }

  next();
};

export default checkPassword;
