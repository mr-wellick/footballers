import { Request, Response } from 'express';
import client from '../../db.js';

export const retrieveSeason = async (req: Request, res: Response) => {
  const { season } = req.body;
  const sql = `select * from ${season}`;

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

  return res
    .status(200)
    .send({ code: 200, message: 'success', data: result.rows });
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

  return res
    .status(200)
    .render('seasons', {
      code: 200,
      message: 'success',
      data: result.rows,
    });
};
