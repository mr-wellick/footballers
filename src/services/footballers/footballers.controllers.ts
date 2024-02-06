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

//export const retrieveByPosition = async (req, res) => {
//  const { season, position } = req.body;
//  const sql = `SELECT * FROM ${season} WHERE pos='${position}' ORDER BY name ASC`;
//  const [err, data] = await promiseUtil(client.query(sql));
//
//  if (err) {
//    return res
//      .status(404)
//      .send(
//        `Cannot retrieve ${season
//          .split('_')
//          .join(' ')} for position ${pos}`,
//      );
//  }
//
//  return res.status(200).send(data);
//};
