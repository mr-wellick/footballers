import bcrypt from 'bcrypt';
import { promiseUtil } from '../../utilities';
import util from 'util';
import { findUser } from '../../sql-queries';
import { insertUser } from '../../sql-queries';

const compare = util.promisify(bcrypt.compare);

export const userRegister = async (req, res) => {
  const [foundUserError, foundUser] = await findUser(req.body);
  console.log(foundUserError, foundUser);

  if (foundUserError || foundUser.length === 1) {
    return res.status(401).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  /* eslint-disable */
  const [insertUserError, insertedUser] = await insertUser(req.body);

  if (insertUserError) {
    return res.status(400).send({
      success: false,
      message: 'Please check your login credentials and try again',
    });
  }

  delete req.body.user_password;
  return res.status(200).send(req.body);
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
    compare(req.body.user_password, foundUser[0].user_password)
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
