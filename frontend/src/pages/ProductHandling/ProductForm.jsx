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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - selectedImages.length);
    setSelectedImages((prev) => [...prev, ...newImages].slice(0, 4));
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form data
    if (
      !productData.name ||
      !productData.description ||
      !productData.category ||
      !productData.price
    ) {
      setError("All fields are required");
      return;
    }

    if (selectedImages.length === 0) {
      setError("At least one image is required");
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
      setError(err.message);
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
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
        {error && (
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
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-3">
              Upload Images (Max 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-40 border border-gray-200 rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {selectedImages.length < 4 && (
                <div
                  className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                  onClick={triggerFileInput}
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
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
                  <span className="text-sm text-gray-500 font-medium">
                    Add Image
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Write a description here"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
              value={productData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Product Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
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
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Product Price ($)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
                value={productData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
