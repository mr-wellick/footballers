import express from 'express';
import { hashPassword } from '../middleware/auth/';
import { validateInput } from '../middleware/auth/';
import { findUser } from '../middleware/sql-queries';
import { userRegister, userLogin } from './users.controllers.js';
import { body } from 'express-validator';

const router = express.Router();

/*
 * @route  POST api/v1/user/register
 * @desc   Register a user
 * @access Public
 */
router.post(
  '/register',
  [
    body('user_email').isEmail().normalizeEmail(),
    body('user_password')
      .isLength({ min: 8, max: 64 })
      .trim()
      .escape(),
  ],
  validateInput,
  findUser,
  hashPassword,
  userRegister
);

/*
 * @route  POST api/v1/user/login
 * @desc   Login a user
 * @access Public
 */
router.post('/login', findUser, userLogin);

export default router;
