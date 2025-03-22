import Feedback from "../models/feedbackModel.js";

// Add Feedback
export const addFeedback = async (req, res) => {
  try {
    const { name, email, contactNo, description } = req.body;
    const newFeedback = new Feedback({ name, email, contactNo, description });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Feedbacks
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Feedback
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Feedback
export const updateFeedback = async (req, res) => {
  try {
    const { name, email, contactNo, description } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, email, contactNo, description },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res
      .status(200)
      .json({ message: "Feedback updated successfully", updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
