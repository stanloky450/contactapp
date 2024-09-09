import express from 'express';
import { createUser, signIn } from '../controller/Users.js';
// const auth = require('../middleware/auth');
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  createUser
);

router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  signIn
);

export default router;
