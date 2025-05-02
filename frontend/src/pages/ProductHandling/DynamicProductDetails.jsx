import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DynamicProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch product");
        }
        const foundProduct = result.find((p) => p._id === productId);
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Product Details
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                ))}
              </div>
              {/* Main Image */}
              <div className="w-full h-64 md:h-80 rounded-md overflow-hidden order-1 md:order-2">
                <img
                  src={`http://localhost:5000/uploads/${product.images[selectedImage]}`}
                  alt="Main Product Image"
                  className="w-full h-full object-contain bg-gray-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-3">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Description:</span> {product.description}
              </p>
            </div>
            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductDetails;