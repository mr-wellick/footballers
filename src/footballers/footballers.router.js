import express from 'express';
import {
  retrieveSeasons,
  retrieveSeason
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

export default router;
