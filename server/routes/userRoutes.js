import { loginUser, logoutUser, signupUser } from '../controller/userController.js';
import express from 'express';
const router = express.Router();

//login
router.post('/login', loginUser);

//signup
router.post('/signup', signupUser);

//logout
router.post('/logout', logoutUser);

export default router;