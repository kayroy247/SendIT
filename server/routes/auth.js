import { Router } from 'express';

import authController from '../controllers/authController';

const router = Router();

// GET all parcel delivery orders

router.post('/signup', UserController.createUser);
router.delete('/login', UserController.deleteUser);

export default router;