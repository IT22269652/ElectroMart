import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const images = [assets.img1, assets.img2, assets.img3, assets.img5];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const featuredProductsRef = useRef(null);

  // Slideshow effect for the header images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["TV", "Camera", "Laptop", "iPhone", "Other Items"];

  const products = [
    {
      id: "1",
      name: "Smart TV",
      price: "$499",
      image: assets.LGTV01,
      category: "TV",
    },
    {
      id: "2",
      name: "LG 4K TV",
      price: "$699",
      image: assets.LGTV02,
      category: "TV",
    },
    {
      id: "3",
      name: "OLED TV",
      price: "$999",
      image: assets.SamsungTV01,
      category: "TV",
    },
    {
      id: "4",
      name: "Sony TV",
      price: "$799",
      image: assets.SonyTV01,
      category: "TV",
    },
    {
      id: "5",
      name: "DSLR Camera",
      price: "$799",
      image: assets.camera01,
      category: "Camera",
    },
    {
      id: "6",
      name: "Mirrorless Camera",
      price: "$899",
      image: assets.camera02,
      category: "Camera",
    },
    {
      id: "7",
      name: "Action Camera",
      price: "$299",
      image: assets.camera03,
      category: "Camera",
    },
    {
      id: "8",
      name: "Instant Camera",
      price: "$199",
      image: assets.camera04,
      category: "Camera",
    },
    {
      id: "9",
      name: "Gaming Laptop",
      price: "$1299",
      image: assets.laptop01,
      category: "Laptop",
    },
    {
      id: "10",
      name: "Ultrabook",
      price: "$1099",
      image: assets.laptop02,
      category: "Laptop",
    },
    {
      id: "11",
      name: "2-in-1 Laptop",
      price: "$899",
      image: assets.laptop03,
      category: "Laptop",
    },
    {
      id: "12",
      name: "Business Laptop",
      price: "$999",
      image: assets.laptop04,
      category: "Laptop",
    },
    {
      id: "13",
      name: "iPhone 14 Pro",
      price: "$999",
      image: assets.Iphone01,
      category: "iPhone",
    },
    {
      id: "14",
      name: "iPhone 11",
      price: "$799",
      image: assets.iphone02,
      category: "iPhone",
    },
    {
      id: "15",
      name: "iPhone 13",
      price: "$499",
      image: assets.iphone03,
      category: "iPhone",
    },
    {
      id: "16",
      name: "iPhone 14 Pro",
      price: "$699",
      image: assets.iphone04,
      category: "iPhone",
    },
    {
      id: "17",
      name: "Wireless Earbuds",
      price: "$199",
      image: assets.earbud1,
      category: "Other Items",
    },
    {
      id: "18",
      name: "Smart Watch",
      price: "$299",
      image: assets.smartwatch,
      category: "Other Items",
    },
    {
      id: "19",
      name: "Bluetooth Speaker",
      price: "$149",
      image: assets.Bluetoothspeakers1,
      category: "Other Items",
    },
    {
      id: "20",
      name: "External Hard Drive",
      price: "$99",
      image: assets.externalharddrive1,
      category: "Other Items",
    },
    {
      id: "21",
      name: "Drone",
      price: "$499",
      image: assets.drone1,
      category: "Other Items",
    },
    {
      id: "22",
      name: "VR Headset",
      price: "$299",
      image: assets.VRheadset1,
      category: "Other Items",
    },
    {
      id: "23",
      name: "Projector",
      price: "$399",
      image: assets.projector1,
      category: "Other Items",
    },
    {
      id: "24",
      name: "Home Theater System",
      price: "$599",
      image: assets.hometheatersystem1,
      category: "Other Items",
    },
  ];

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
    featuredProductsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-between px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Left Side: Text and Call to Action */}
        <div className="text-white max-w-md">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            🛒 Shop the Latest Electronics
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light mt-4">
            <img
              className="w-24 md:w-28"
              src={assets.group_profiles}
              alt="Profiles"
            />
            <p className="mt-2 text-sm md:text-base lg:text-lg">
              Explore the newest gadgets, smartphones, and accessories at
              unbeatable prices.
            </p>
          </div>
          {/* Shop Now button that scrolls to Featured Products */}
          <button
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            onClick={scrollToFeaturedProducts}
          >
            Shop Now →
          </button>
        </div>

        {/* Right Side: Image Slider with Navigation Dots in the Middle */}
        <div className="relative w-1/2 h-full flex items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute w-auto h-full object-contain transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Navigation Dots Centered in the Middle of the Image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="mt-8 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">Find by Category</h2>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {categories.map((category, index) => (
            <label
              key={index}
              className={`flex items-center space-x-2 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                selectedCategories.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div ref={featuredProductsRef} className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {selectedCategories.length > 0
            ? `${selectedCategories.join(", ")} Products`
            : "Featured Products"}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
