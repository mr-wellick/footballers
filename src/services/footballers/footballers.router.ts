import express from 'express';
import { retrieveSeason, retrieveSeasons } from './footballers.controllers.js';
import validateInput from '../../middleware/validate.input.js';
import { body } from 'express-validator';

const Router = express.Router();

/*
 * @route  GET api/v1/footballers/season
 * @desc   Retrieve season
 * @access Public
 */
Router.post(
  '/season',
  [body('season').isString().trim()],
  validateInput,
  retrieveSeason,
);

Router.get(
  '/seasons',
  retrieveSeasons,
);

export default Router;
