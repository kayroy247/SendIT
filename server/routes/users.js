import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication';
import { validateUserInput } from '../middleware/validateUserInput';

const router = Router();

// GET all parcel delivery orders
router.get('/',
  authenticateAdmin,
  UserController.getAllUsers);

router.get('/:id',
  authenticateUser,
  UserController.getUserById);

router.get('/:id/parcels',
  authenticateUser,
  UserController.getUserParcels);

router.put('/:id/',
  authenticateUser,
  validateUserInput,
  UserController.updateUser);

router.delete('/:id',
  authenticateAdmin,
  UserController.deleteUser);

export default router;
