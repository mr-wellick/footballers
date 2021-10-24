import express from 'express';
import { validateInput } from '../../middleware/index.js';
import { userRegister, userLogin } from './users.controllers.js';
import { body } from 'express-validator';

const router = new express.Router();

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
  userRegister
);

/*
 * @route  POST api/v1/user/login
 * @desc   Login a user
 * @access Public
 */
router.post(
  '/login',
  [
    body('user_email').isEmail().normalizeEmail(),
    body('user_password')
      .isLength({ min: 8, max: 64 })
      .trim()
      .escape(),
  ],
  validateInput,
  userLogin
);

export default router;
