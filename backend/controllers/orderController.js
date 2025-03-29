import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Delivery from '../models/Delivery.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, deliveryId, paymentId, items, total } = req.body;

    // Validate deliveryId
    if (!mongoose.isValidObjectId(deliveryId)) {
      return res.status(400).json({ message: 'Invalid deliveryId format' });
    }

    // Validate paymentId
    if (!mongoose.isValidObjectId(paymentId)) {
      return res.status(400).json({ message: 'Invalid paymentId format' });
    }

    // Check if the delivery exists
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery record not found' });
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required and cannot be empty' });
    }

    for (const item of items) {
      if (!item.name || !item.price || !item.quantity || !item.image) {
        return res.status(400).json({ message: 'Each item must have name, price, quantity, and image' });
      }
    }

    // Validate total
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ message: 'Total must be a positive number' });
    }

    const newOrder = new Order({
      userId,
      deliveryId,
      paymentId,
      items,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get all orders for a specific user
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId })
      .populate('deliveryId')
      .populate('paymentId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('deliveryId')
      .populate('paymentId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update the status of an order item
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, newStatus } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    if (!mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID format' });
    }

    if (!['Pending', 'Processing', 'Ready', 'Delivered'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    item.status = newStatus;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Update an order (e.g., to add paymentId)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, deliveryId, paymentId, items, total } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update fields if provided
    if (userId) order.userId = userId;
    if (deliveryId) {
      if (!mongoose.isValidObjectId(deliveryId)) {
        return res.status(400).json({ message: 'Invalid deliveryId format' });
      }
      const delivery = await Delivery.findById(deliveryId);
      if (!delivery) {
        return res.status(404).json({ message: 'Delivery record not found' });
      }
      order.deliveryId = deliveryId;
    }
    if (paymentId) {
      if (!mongoose.isValidObjectId(paymentId)) {
        return res.status(400).json({ message: 'Invalid paymentId format' });
      }
      order.paymentId = paymentId;
    }
    if (items) {
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is required and cannot be empty' });
      }
      for (const item of items) {
        if (!item.name || !item.price || !item.quantity || !item.image) {
          return res.status(400).json({ message: 'Each item must have name, price, quantity, and image' });
        }
      }
      order.items = items;
    }
    if (total) {
      if (typeof total !== 'number' || total <= 0) {
        return res.status(400).json({ message: 'Total must be a positive number' });
      }
      order.total = total;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};