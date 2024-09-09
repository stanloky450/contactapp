import express from 'express';
import { check, validationResult } from 'express-validator';
import {
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controller/Contact.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContact);
router.post(
  '/',
  // auth,
  check('name', 'Name is required').not().isEmpty(),
  createContact
);

router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

export default router;
