import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/User.js';
import { check, validationResult } from 'express-validator';

dotenv.config();
const secret = 'test';

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const tokens = jsonwebtoken.sign(
      payload,
      // secret,
      process.env.jwtSecret,
      // config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },

      (err, tokens) => {
        if (err) throw err;
        res.json({ tokens });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
