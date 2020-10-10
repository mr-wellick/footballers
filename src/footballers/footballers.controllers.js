import { db } from '../db.js';
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const retrieveFootballers = async (req, res) => {
  const sql = 'SELECT * FROM poc_config.footballers';

  try {
    const footballers = await query(sql);
    return res.status(200).send(footballers);
  } catch (err) {
    return res.status(404).send('Cannot find footballers');
  }
};

export const retrieveSquad = async (req, res) => {
  const sql = 'SELECT * FROM poc_config.atletico_2003';

  try {
    const squad = await query(sql);
    return res.status(200).send(squad);
  } catch (err) {
    return res.status(404).send('Cannot find sqad');
  }
};

export const retrievePlayer = async (req, res) => {
  const { name } = req.body;
  const sql = `SELECT * FROM poc_config.footballers WHERE Name='${name}'`;

  try {
    const player = await query(sql);
    return res.status(200).send(player);
  } catch (err) {
    return res.status(404).send('Cannot find player');
  }
};
