import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    images: "",
  });
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Product name is required";
        } else if (value.length > 100) {
          error = "Product name must be less than 100 characters";
        }
        break;
      case "description":
        if (!value.trim()) {
          error = "Description is required";
        } else if (value.length < 20) {
          error = "Description should be at least 20 characters";
        } else if (value.length > 1000) {
          error = "Description must be less than 1000 characters";
        }
        break;
      case "category":
        if (!value) {
          error = "Please select a category";
        }
        break;
      case "price":
        if (!value) {
          error = "Price is required";
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          error = "Price must be a positive number";
        } else if (parseFloat(value) > 1000000) {
          error = "Price must be less than $1,000,000";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - selectedImages.length);

    // Validate image types and sizes
    const validImages = newImages.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          images: "Only JPG, PNG, or WEBP images are allowed",
        }));
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          images: "Image size must be less than 5MB",
        }));
        return false;
      }
      return true;
    });

    if (validImages.length > 0) {
      setSelectedImages((prev) => [...prev, ...validImages].slice(0, 4));
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    if (selectedImages.length === 1) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(productData).forEach((key) => {
      const error = validateField(key, productData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    if (selectedImages.length === 0) {
      newErrors.images = "At least one image is required";
      isValid = false;
    } else {
      newErrors.images = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      setSuccess("Product Added Successfully!");
      setTimeout(() => {
        navigate("/admin/list-items");
      }, 1500);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Failed to add product. Please try again.",
      }));
      console.error("Error adding product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center space-x-2 animate-fade-in">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}
        {errors.form && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center space-x-2 animate-fade-in">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">
              Upload Images (Max 4)
            </label>
            {errors.images && (
              <p className="text-red-500 text-sm mb-2">{errors.images}</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-32 border border-gray-200 rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {selectedImages.length < 4 && (
                <div
                  className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                  onClick={triggerFileInput}
                >
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-xs md:text-sm text-gray-500 font-medium text-center">
                    Add Image
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/jpeg, image/png, image/webp"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm`}
              value={productData.name}
              onChange={handleInputChange}
              required
              maxLength={100}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Write a description here (minimum 20 characters)"
              rows="4"
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm resize-none`}
              value={productData.description}
              onChange={handleInputChange}
              required
              minLength={20}
              maxLength={1000}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Category
              </label>
              <select
                name="category"
                className={`w-full px-4 py-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm`}
                value={productData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="TV">TV</option>
                <option value="Laptops">Laptops</option>
                <option value="Camera">Camera</option>
                <option value="Iphone">Iphone</option>
                <option value="Other items">Other items</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Price ($)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className={`w-full px-4 py-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm`}
                value={productData.price}
                onChange={handleInputChange}
                required
                min="0.01"
                step="0.01"
                max="1000000"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-indigo-700 hover:to-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 text-md font-semibold shadow-md transition-all duration-200`}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;