import express from 'express';
import { retrieveSeason } from './footballers.controllers.js';
import validateInput from '../../middleware/validate.input.js';
import { body } from 'express-validator';

const Router = express.Router();

/*
 * @route  GET api/v1/season
 * @desc   Retrieve season
 * @access Public
 */
Router.post(
  '/season',
  [body('season').isString().trim()],
  validateInput,
  retrieveSeason,
);

///*
// * @route  GET api/v1/position
// * @desc   Retrieve players by position for specified season
// * @access Public
// */
//Router.post('/position', retrieveByPosition);

export default Router;
