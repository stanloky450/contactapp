import express from 'express';
import { check, validationResult } from 'express-validator';
import { signIn } from '../controller/Auth.js';

const router = express.Router();

router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  signIn
);

export default router;
