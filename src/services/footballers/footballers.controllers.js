import { query } from '../../db.js';
import { promiseUtil } from '../../utilities';

export const retrieveSeasons = async (req, res) => {
  /* eslint-disable */
  const sql = "SHOW TABLES FROM poc_config LIKE '%season%'";
  const [err, data] = await promiseUtil(query(sql));

  if (err) {
    return res.status(404).send('Cannot retrieve seasons');
  }

  const parsedData = data.map(
    (datum) => datum['Tables_in_poc_config (%season%)']
  );

  return res.status(200).send({ seasons: parsedData });
};

export const retrieveSeason = async (req, res) => {
  const { season } = req.body;
  const sql = `SELECT * FROM poc_config.${season}`;
  const [err, data] = await promiseUtil(query(sql));

  if (err) {
    return res.status(404).send('Cannot retrieve season');
  }

  return res.status(200).send({ season: data });
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
