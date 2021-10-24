import bcrypt from 'bcrypt';
import util from 'util';
import { promiseUtil } from '../utilities/index.js';

const hash = util.promisify(bcrypt.hash);
const saltRounds = 10;

const hashPassword = async (userPassword) => {
  const [err, encryptedPassword] = await promiseUtil(
    hash(userPassword, saltRounds)
  );

  return [err, encryptedPassword];
};

export default hashPassword;
