import express from 'express';
import {
  retrieveSeasons,
  retrieveSeason,
  retrieveByPosition
} from './footballers.controllers.js';

const router = express.Router();

/*
 * @route  GET api/v1/seasons
 * @desc   Retrieve all seasons
 * @access Public
 */
router.get('/seasons', retrieveSeasons);

/*
 * @route  GET api/v1/season
 * @desc   Retrieve season
 * @access Public
 */
router.post('/season', retrieveSeason);

/*
 * @route  GET api/v1/position
 * @desc   Retrieve players by position for specified season
 * @access Public
 */
router.post('/position', retrieveByPosition);

export default router;
