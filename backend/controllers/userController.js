import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, contactNo, address, gender, birthday } =
    req.body;

  try {
    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !contactNo ||
      !address ||
      !gender ||
      !birthday
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // Validate contact number
    if (!validator.isMobilePhone(contactNo, "any", { strictMode: false })) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number",
      });
    }

    // Validate gender
    if (
      !["male", "female", "other", "prefer-not-to-say"].includes(
        gender.toLowerCase()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid gender (Male, Female, Other, Prefer not to say)",
      });
    }

    // Validate birthday
    if (!validator.isDate(birthday)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid birthday (YYYY-MM-DD)",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      contactNo,
      address,
      gender,
      birthday: new Date(birthday),
    });

    // Save the user to the database
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// Fetch user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching profile" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email, contactNo, address, gender, birthday } = req.body;

  try {
    // Check for missing fields
    if (!name || !email || !contactNo || !address || !gender || !birthday) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validate contact number
    if (!validator.isMobilePhone(contactNo, "any", { strictMode: false })) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number",
      });
    }

    // Validate gender
    if (
      !["male", "female", "other", "prefer-not-to-say"].includes(
        gender.toLowerCase()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid gender (Male, Female, Other, Prefer not to say)",
      });
    }

    // Validate birthday
    if (!validator.isDate(birthday)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid birthday (YYYY-MM-DD)",
      });
    }

    // Check if email is already used by another user
    const existingUser = await userModel.findOne({
      email,
      _id: { $ne: req.user.id },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use" });
    }

    // Update user
    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          name,
          email,
          contactNo,
          address,
          gender,
          birthday: new Date(birthday),
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating profile" });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    console.error("Fetch all users error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching users" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting user" });
  }
};

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
