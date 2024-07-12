import { loginUser, signupUser } from '../controller/userController.js';
import express from 'express';
const router = express.Router();

//login
router.post('/login', loginUser);

//signup
router.post('/signup', signupUser);

export default router;