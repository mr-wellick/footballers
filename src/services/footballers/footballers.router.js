import express from 'express';
import {
  retrieveSeason,
  //  retrieveByPosition,
} from './footballers.controllers.js';

const Router = new express.Router();

/*
 * @route  GET api/v1/season
 * @desc   Retrieve season
 * @access Public
 */
Router.post('/season', retrieveSeason);

///*
// * @route  GET api/v1/position
// * @desc   Retrieve players by position for specified season
// * @access Public
// */
//Router.post('/position', retrieveByPosition);

export default Router;
