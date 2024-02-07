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

  const dim = { width: 1500, height: 500, padding: 100, scaleBy: 2 };
  const xScale = scalePoint()
    .domain(result.rows.map((item) => item.name))
    .range([dim.padding, dim.width - dim.padding]);
  const yScale = scaleLinear()
    .domain([0, Math.max(...result.rows.map((item) => item.g))])
    .range([dim.height - dim.padding, dim.padding]);

  return res.status(200).render('graph', {
    code: 200,
    message: 'success',
    data: result.rows,
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

  return res.status(200).render('seasons', {
    code: 200,
    message: 'success',
    data: result.rows,
  });
};
