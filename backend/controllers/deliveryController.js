import mongoose from 'mongoose';
import Delivery from '../models/Delivery.js';

export const createDelivery = async (req, res) => {
  try {
    const { userId, firstName, lastName, streetAddress, streetAddress2, city, postalCode, contactNumber, email } = req.body;

    // Validate required fields
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    if (!firstName) return res.status(400).json({ message: 'firstName is required' });
    if (!lastName) return res.status(400).json({ message: 'lastName is required' });
    if (!streetAddress) return res.status(400).json({ message: 'streetAddress is required' });
    if (!city) return res.status(400).json({ message: 'city is required' });
    if (!postalCode) return res.status(400).json({ message: 'postalCode is required' });
    if (!contactNumber) return res.status(400).json({ message: 'contactNumber is required' });
    if (!email) return res.status(400).json({ message: 'email is required' });

    const newDelivery = new Delivery({
      userId,
      firstName,
      lastName,
      streetAddress,
      streetAddress2: streetAddress2 || '',
      city,
      postalCode,
      contactNumber,
      email,
    });

    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    console.error('Error in createDelivery:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.message });
    }
    res.status(500).json({ message: 'Error creating delivery record', details: error.message });
  }
};

export const getDeliveryByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deliveries = await Delivery.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Error in getDeliveryByUser:', error);
    res.status(500).json({ message: 'Error fetching delivery details', details: error.message });
  }
};

export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ createdAt: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Error in getAllDeliveries:', error);
    res.status(500).json({ message: 'Error fetching all delivery details', details: error.message });
  }
};

export const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid delivery ID' });
    }

    const updatedData = {
      ...req.body,
      updatedAt: Date.now()
    };

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json(updatedDelivery);
  } catch (error) {
    console.error('Error in updateDelivery:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.message });
    }
    res.status(500).json({ message: 'Error updating delivery', details: error.message });
  }
};

export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid delivery ID' });
    }

    const deletedDelivery = await Delivery.findByIdAndDelete(id);

    if (!deletedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    console.error('Error in deleteDelivery:', error);
    res.status(500).json({ message: 'Error deleting delivery', details: error.message });
  }
};