import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  updateOrder, // Add the new update function
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders for a specific user
router.get('/user/:userId', getOrdersByUser);

// Get all orders (for admin)
router.get('/', getAllOrders);

// Update the status of an order item
router.put('/:id/status', updateOrderStatus);

// Update an order (e.g., to add paymentId)
router.put('/:id', updateOrder);

// Delete an order
router.delete('/:id', deleteOrder);

export default router;