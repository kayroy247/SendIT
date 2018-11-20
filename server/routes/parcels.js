import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const router = Router();

// GET all parcel delivery orders
router.get('/', ParcelController.getAllParcels);
router.get('/:id', ParcelController.getParcelById);
router.put('/:id/cancel', ParcelController.cancelParcel);
router.put('/:id/', ParcelController.updateParcel);
router.put('/:id/destination', ParcelController.updateParcel);
router.put('/:id/status', ParcelController.updateParcel);
router.put('/:id/presentLocation', ParcelController.updateParcel);
router.post('/', ParcelController.createParcel);
router.delete('/:id', ParcelController.deleteParcel);

export default router;
