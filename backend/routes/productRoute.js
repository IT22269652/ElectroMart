import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  },
});

const router = express.Router();

router.post("/", upload.array("images", 4), createProduct);
router.get("/", getProducts);
router.put("/:id", upload.array("images", 4), updateProduct); // New route for updating
router.delete("/:id", deleteProduct); // New route for deleting

export default router;
