import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const images = [assets.img1, assets.img2, assets.img3, assets.img5];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

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
      image: assets.wirelessEarbuds,
      category: "Other Items",
    },
    {
      id: "18",
      name: "Smart Watch",
      price: "$299",
      image: assets.smartWatch,
      category: "Other Items",
    },
    {
      id: "19",
      name: "Bluetooth Speaker",
      price: "$149",
      image: assets.bluetoothSpeaker,
      category: "Other Items",
    },
    {
      id: "20",
      name: "External Hard Drive",
      price: "$99",
      image: assets.externalHardDrive,
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

  return (
    <div>
      <div className="relative w-full h-80 md:h-96 lg:h-[400px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-between px-10 overflow-hidden">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            🛒 Shop the Latest Electronics
          </h1>
          <p className="mt-4 text-sm md:text-base">
            Explore the newest gadgets, smartphones, and accessories at
            unbeatable prices.
          </p>
        </div>

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
        </div>
      </div>

      <div className="mt-8 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">Find by Category</h2>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 px-6 justify-center">
        {categories.map((category, index) => (
          <label
            key={index}
            className={`flex items-center space-x-2 p-3 rounded-lg shadow-md cursor-pointer ${
              selectedCategories.includes(category)
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="font-medium">{category}</span>
          </label>
        ))}
      </div>

      <div className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {selectedCategories.length > 0
            ? `${selectedCategories.join(", ")} Products`
            : "Featured Products"}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
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
