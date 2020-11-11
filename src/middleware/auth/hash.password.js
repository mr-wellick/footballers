import bcrypt from 'bcrypt';
import util from 'util';
import { promiseUtil } from '../../utilities/';

const hash = util.promisify(bcrypt.hash);
const saltRounds = 10;

const hashPassword = async (req, res, next) => {
  if (res.locals.user) {
    return res.status(401).send('user exists');
  }

  if (!res.locals.user) {
    const { user_password } = req.body;
    const [err, encryptedPassword] = await promiseUtil(
      hash(user_password, saltRounds)
    );

    if (err) {
      return res.status(400).send('hash password error');
    }

    req.body.user_password = encryptedPassword;
  }

  next();
};

export default hashPassword;
