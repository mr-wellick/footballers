import express from 'express';
import { retrieveFootballers } from './footballers.controllers.js';
import { retrieveSquad } from './footballers.controllers.js';
import { retrievePlayer } from './footballers.controllers.js';

const router = express.Router();

/*
 * @route  GET api/v1/footballers
 * @desc   Retrieve all footballers
 * @access Public
 */
router.get('/footballers', retrieveFootballers);

/*
 * @route GET api/v1/squad
 * @desc Retrieve sqad list
 * @access Public
 */
router.get('/squad', retrieveSquad);

/*
 * @route GET api/v1/player
 * @desc Retrieve player
 * @access Public
 */
router.post('/player', retrievePlayer);

export default router;
