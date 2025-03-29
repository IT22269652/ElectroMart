import express from 'express';
import { createPayment, getPaymentByOrder, getAllPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/order/:orderId', getPaymentByOrder);
router.get('/', getAllPayments);

export default router;