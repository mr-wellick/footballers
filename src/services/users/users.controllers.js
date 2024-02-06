import bcrypt from 'bcrypt';
import { promiseUtil } from '../../utilities/index.js';
import util from 'util';
import { findUser } from '../../sql-queries/index.js';
import { insertUser } from '../../sql-queries/index.js';

const compare = util.promisify(bcrypt.compare);

export const userRegister = async (req, res) => {
  const [foundUserError, foundUser] = await findUser(req.body);

  if (foundUserError || foundUser.rows.length === 1) {
    return res.status(401).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  const [insertUserError] = await insertUser(req.body);

  if (insertUserError) {
    return res.status(400).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  const [, newUser] = await findUser(req.body);
  console.log(newUser);

  return res.status(200).send({});
};

export const userLogin = async (req, res) => {
  const [foundUserError, foundUser] = await findUser(req.body);

  if (foundUser.length === 0 || foundUserError) {
    return res.status(404).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  const [passwordMatchErr, passwordMatch] = await promiseUtil(
    compare(req.body.user_password, foundUser[0].user_password),
  );

  if (!passwordMatch || passwordMatchErr) {
    return res.status(401).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  delete foundUser[0].user_password;

  return res.status(200).send({
    success: true,
    user: foundUser[0],
  });
};
