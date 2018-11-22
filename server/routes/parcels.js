import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import validateParcelInput from '../middleware/InputValidation';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication';

const router = Router();

// GET all parcel delivery orders
router.get('/',
  authenticateAdmin,
  ParcelController.getAllParcels);

router.get('/:id',
  authenticateUser,
  ParcelController.getParcelById);

router.put('/:id/cancel',
  authenticateUser,
  ParcelController.cancelParcel);

router.put('/:id',
  authenticateUser,
  validateParcelInput,
  ParcelController.updateParcel);

router.put('/:id/destination',
  authenticateUser,
  validateParcelInput,
  ParcelController.updateParcel);

router.put('/:id/status',
  authenticateAdmin,
  validateParcelInput,
  ParcelController.updateStatus);

router.put('/:id/presentLocation',
  authenticateUser,
  validateParcelInput,
  ParcelController.updateLocation);

router.post('/',
  authenticateUser,
  validateParcelInput,
  ParcelController.createParcel);

router.delete('/:id',
  authenticateAdmin,
  ParcelController.deleteParcel);

export default router;
