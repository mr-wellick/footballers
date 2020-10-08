import { db } from '../db.js';

export const retrieveFootballers = (req, res) => {
  const sql = 'SELECT * FROM poc_config.footballers';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send('Cannot find stocks');
    }

    return res.status(200).send(result);
  });
};
