import util from 'util';
import { db } from '../../db.js';
import { promiseUtil } from '../../utilities/';

const query = util.promisify(db.query).bind(db);

const findUser = async (req, res, next) => {
  const { user_email } = req.body;
  const sql = `SELECT * FROM poc_config.users WHERE user_email='${user_email}'`;
  const [err, user] = await promiseUtil(query(sql));

  if (err) {
    return res.status(500).send('user error');
  }

  res.locals.user = user[0];
  next();
};

export default findUser;
