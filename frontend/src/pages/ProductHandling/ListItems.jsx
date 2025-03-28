import React, { useEffect, useState, useRef } from "react";

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch products");
        }
        setProducts(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to delete product");
        }

        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (err) {
        setError(err.message);
        console.error("Error deleting product:", err);
      }
    }
  };

  // Handle Update (Open Modal)
  const handleUpdateClick = (product) => {
    setEditProduct({
      id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
    });
    setSelectedImages([]);
  };

  // Handle Image Upload for Update
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 1);
    setSelectedImages(newImages);
  };

  const removeImage = () => {
    setSelectedImages([]);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle Input Change for Update Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  // Handle Update Submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    if (selectedImages.length > 0) {
      formData.append("images", selectedImages[0]);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${editProduct.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update product");
      }

      setProducts(
        products.map((product) =>
          product._id === editProduct.id ? result : product
        )
      );
      setEditProduct(null);
      alert("Product updated successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Error updating product:", err);
    }
  };

  if (loading)
    return <div className="text-center p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Product Inventory
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Product Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Added Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition-colors duration-200`}
                >
                  <td className="px-6 py-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="text-green-600 font-semibold">
                      ${product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-3">
                    <button
                      onClick={() => handleUpdateClick(product)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 shadow-md flex items-center space-x-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                        />
                      </svg>
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center space-x-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2zm-2 4h.01M17 7h.01"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Update Product
            </h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Image (Optional, Max 1)
                </label>
                <div className="flex items-center space-x-4">
                  {selectedImages.length > 0 ? (
                    <div className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(selectedImages[0])}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                        onClick={removeImage}
                      >
                        ×
                      </button>
                    </div>
                  ) : editProduct.images && editProduct.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000/uploads/${editProduct.images[0]}`}
                      alt={editProduct.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                  <div
                    className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <svg
                      className="w-8 h-8 text-gray-400"
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
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={editProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={editProduct.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItems;
