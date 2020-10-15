import { db } from '../db.js';
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const retrieveSeasons = async (req, res) => {
  const sql = 'SHOW TABLES FROM poc_config;';

  try {
    const seasons = await query(sql);
    return res.status(200).send(seasons);
  } catch (err) {
    return res.status(404).send('Cannot retrieve seasons');
  }
};

export const retrieveSeason = async (req, res) => {
  const { season } = req.body;
  const sql = `SELECT * FROM poc_config.${season}`;

  try {
    const season = await query(sql);
    return res.status(200).send(season);
  } catch (err) {
    return res.status(404).send('Cannot retrieve season');
  }
};
