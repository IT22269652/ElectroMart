import express from 'express';
import { createPayment, getPaymentByOrder, getAllPayments, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/order/:orderId', getPaymentByOrder);
router.get('/', getAllPayments);
router.delete('/:id', deletePayment); // Add delete root

export default router;