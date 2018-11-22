import { Router } from 'express';
import authController from '../controllers/authControllers';
import { validateUserInput, validateLogin } from '../middleware/validateUserInput';

const router = Router();


router.post('/signup', validateUserInput, authController.signUp);
router.post('/login', validateLogin, authController.login);

export default router;
