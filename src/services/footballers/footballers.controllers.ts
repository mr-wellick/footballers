import { Request, Response } from 'express';
import client from '../../db.js';
import { scaleLinear, scalePoint } from 'd3-scale';

export const retrieveSeason = async (req: Request, res: Response) => {
  const { season } = req.body;
  const sql = `select * from ${season} where ${season}.g != 'NA'`;

  let result;
  try {
    result = await client.query(sql);
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      code: 404,
      message: 'Cannot retrieve season',
      data: null,
    });
  }

  // filter out any players with 0 goals in data
  const filteredData = result.rows.filter((item) => item.g != 0);
  const dim = { width: 1300, height: 500, padding: 100, scaleBy: 2 };
  const xScale = scalePoint()
    .domain(filteredData.map((item) => item.name))
    .range([dim.padding, dim.width - dim.padding]);
  const yScale = scaleLinear()
    .domain([0, Math.max(...filteredData.map((item) => item.g))])
    .range([dim.height - dim.padding, dim.padding]);

  return res.status(200).render('graph', {
    data: filteredData,
    players: result.rows.map((item) => item.num + ': ' + item.name),
    season,
    dim,
    xScale,
    yScale,
  });
};

export const retrieveSeasons = async (_: Request, res: Response) => {
  const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;

  let result;
  try {
    result = await client.query(sql);
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      code: 404,
      message: 'Cannot retrieve season',
      data: null,
    });
  }

  return res.status(200).render('seasons', { data: result.rows });
};
