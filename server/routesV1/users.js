import { Router } from 'express';
import UserController from '../controllersV1/users';

const router = Router();

// GET all parcel delivery orders
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/:id/parcels', UserController.getUserParcels);
router.put('/:id/', UserController.updateUser);
router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
