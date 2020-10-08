import express from 'express';
import { retrieveFootballers } from './footballers.controllers.js';

const router = express.Router();

/*
 * @route  GET api/v1/footballers
 * @desc   Retrieve all footballers
 * @access Public
 */
router.get('/footballers', retrieveFootballers);

export default router;
