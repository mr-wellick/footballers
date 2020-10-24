import express from 'express';
import {
  checkPassword,
  hashPassword,
  userExists,
} from '../middleware/auth/';
import { userRegister, userLogin } from './users.controllers.js';

const router = express.Router();

/*
 * @route  POST api/v1/user/register
 * @desc   Register a user
 * @access Public
 */
router.post('/register', userExists, hashPassword, userRegister);

/*
 * @route  POST api/v1/user/login
 * @desc   Login a user
 * @access Public
 */
router.post('/login', checkPassword, userLogin);

export default router;
