import { db } from '../db.js';
import { promiseUtil } from '../utilities';
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const retrieveSeasons = async (req, res) => {
  const sql = 'SHOW TABLES FROM poc_config;';
  const [err, data] = await promiseUtil(query(sql));

  if (err) {
    return res.status(404).send('Cannot retrieve seasons');
  }

  return res.status(200).send(data);
};

export const retrieveSeason = async (req, res) => {
  const { season } = req.body;
  const sql = `SELECT * FROM poc_config.${season}`;
  const [err, data] = await promiseUtil(query(sql));

  if (err) {
    return res.status(404).send('Cannot retrieve season');
  }

  return res.status(200).send(data);
};

export const retrieveByPosition = async (req, res) => {
  const { season, pos } = req.body;
  const sql = `SELECT * FROM poc_config.${season} WHERE pos='${pos}' ORDER BY name ASC`;
  const [err, data] = await promiseUtil(query(sql));

  if (err) {
    return res
      .status(404)
      .send(
        `Cannot retrieve ${season
          .split('_')
          .join(' ')} for position ${pos}`
      );
  }

  return res.status(200).send(data);
};
