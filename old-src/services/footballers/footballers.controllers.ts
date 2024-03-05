import { Request, Response } from 'express';
import client from '../../db.js';
import { scaleLinear, scaleBand } from 'd3-scale';
import {
  axisBottom,
  axisLeft,
  position,
} from '../../utils/attribute.js';

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

  const filteredData = result.rows.filter((item) => item.g != 0);
  const dim = { width: 1300, height: 500, padding: 100, scaleBy: 2 };
  const xScale = scaleBand()
    .domain(filteredData.map((item) => item.name))
    .range([dim.padding, dim.width - dim.padding])
    .padding(0.1);

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
    axisBottom,
    axisLeft,
    position,
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