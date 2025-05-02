import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VoiceNavigation from "../components/VoiceNavigation";
import { assets } from "../assets/assets";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [voiceFeedback, setVoiceFeedback] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutMessage, setLogoutMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const featuredProductsRef = useRef(null);

  // Check for logout state from admin
  useEffect(() => {
    if (location.state?.fromAdminLogout) {
      setLogoutMessage(location.state.message);
      const timer = setTimeout(() => {
        setLogoutMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Slideshow images
  const images = [assets.img1, assets.img2, assets.img3, assets.img5];

  // Categories for filtering
  const categories = ["TV", "Laptops", "Camera", "Iphone", "Other items"];

  // Fetch products from the backend
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

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.category)
        )
      : products;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVoiceCommand = (command, handled) => {
    if (handled) {
      setVoiceFeedback(`Executed: ${command}`);
      setTimeout(() => setVoiceFeedback(null), 3000);
    }
  };

  if (loading) return <div className="text-center p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="relative">
      {/* Logout Success Message */}
      {logoutMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-fade">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {logoutMessage}
        </div>
      )}

      {/* Voice Feedback Toast */}
      {voiceFeedback && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {voiceFeedback}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-between px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Voice Navigation Button */}
        <div className="absolute top-4 right-4 z-10">
          <VoiceNavigation
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onVoiceCommand={handleVoiceCommand}
          />
        </div>

        {/* Hero Content */}
        <div className="text-white max-w-md z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            🛒 Shop the Latest Electronics
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light mt-4">
            <img
              className="w-24 md:w-28"
              src={assets.group_profiles}
              alt="Happy customers"
            />
            <p className="mt-2 text-sm md:text-base lg:text-lg">
              Explore the newest gadgets, smartphones, and accessories at
              unbeatable prices.
            </p>
          </div>
          <button
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            onClick={scrollToFeaturedProducts}
          >
            Shop Now →
          </button>
        </div>

        {/* Image Slideshow */}
        <div className="relative w-1/2 h-full flex items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Featured product ${index + 1}`}
              className={`absolute w-auto h-full object-contain transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white scale-125" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div ref={featuredProductsRef} className="mt-12 px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {selectedCategories.length > 0
            ? `${selectedCategories.join(", ")} Products`
            : "Featured Products"}
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="h-60 p-4 flex items-center justify-center bg-gray-50">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.images[0]}`}
                      alt={product.name}
                      className="h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="mt-3 w-full py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add this style tag for animations */}
      <style>{`
        .animate-fade {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
          10% { opacity: 1; transform: translateY(0) translateX(-50%); }
          90% { opacity: 1; transform: translateY(0) translateX(-50%); }
          100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;