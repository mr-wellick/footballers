import express from 'express';
import { hashPassword } from '../middleware/auth/index.js';
import { userRegister } from './users.controllers.js';

const router = express.Router();

/*
 * @route  POST api/v1/login
 * @desc   Register a user
 * @access Public
 */
router.post('/login', hashPassword, userRegister);

export default router;
