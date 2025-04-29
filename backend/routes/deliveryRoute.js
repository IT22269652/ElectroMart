import express from 'express';
import { 
  createDelivery, 
  getDeliveryByUser, 
  getAllDeliveries,
  updateDelivery,
  deleteDelivery 
} from '../controllers/deliveryController.js';

const router = express.Router();

// Create a new delivery record
router.post('/', createDelivery);

// Get delivery details for a specific user
router.get('/user/:userId', getDeliveryByUser);

// Get all delivery details (for admin)
router.get('/', getAllDeliveries);

// Update a delivery record
router.put('/:id', updateDelivery);

// Delete a delivery record
router.delete('/:id', deleteDelivery);

export default router;