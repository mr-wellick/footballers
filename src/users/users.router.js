import express from 'express';
import { hashPassword, userExists } from '../middleware/auth/';
import { findUser } from '../middleware/sql-queries';
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
router.post('/login', findUser, userLogin);

export default router;
