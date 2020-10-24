import { db } from '../../db.js';
import { promiseUtil } from '../../utilities/';
import util from 'util';

const query = util.promisify(db.query).bind(db);

const userExists = async (req, res, next) => {
  const { user_email } = req.body;
  const sql = `SELECT user_email FROM poc_config.users WHERE user_email='${user_email}'`;
  const [err, user] = await promiseUtil(query(sql));

  if (err) {
    return res.status(500).send('user exists error');
  }

  if (user.length === 1) {
    return res.status(401).send('user exists');
  }

  next();
};

export default userExists;
