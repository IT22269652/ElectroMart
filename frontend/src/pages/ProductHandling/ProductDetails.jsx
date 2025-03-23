import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";

const ProductDetails = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const products = [
    {
      id: "1",
      name: "Smart TV",
      price: "$499",
      originalPrice: "$799",
      discount: "37% Off",
      warranty: "2 Years",
      offers: [
        "Assured Cashback upto $50 on paying with Credit Cards.",
        "Flat 10% Instant Discount Up to $100 with HDFC Credit Card.",
      ],
      images: [
        assets.LGTV01,
        assets.LGTV011,
        assets.LGTV012,
        assets.LGTV013,
      ],
    },

    {
      id: "2",
      name: "LG 4K TV",
      price: "$499",
      originalPrice: "$799",
      discount: "37% Off",
      warranty: "2 Years",
      offers: [
        "Assured Cashback upto $50 on paying with Credit Cards.",
        "Flat 10% Instant Discount Up to $100 with HDFC Credit Card.",
      ],
      images: [
        assets.LGTV02,
        assets.LGTV021,
        assets.LGTV022,
        assets.LGTV023,
      ],
    },

    {
      id: "3",
      name: "OLED TV",
      price: "$499",
      originalPrice: "$799",
      discount: "37% Off",
      warranty: "2 Years",
      offers: [
        "Assured Cashback upto $50 on paying with Credit Cards.",
        "Flat 10% Instant Discount Up to $100 with HDFC Credit Card.",
      ],
      images: [
          assets.SamsungTV01,
          assets.SamsungTV011,
          assets.SamsungTV01,
          assets.SamsungTV012,
      ],
    },

    {
      id: "4",
      name: "SONY TV",
      price: "$499",
      originalPrice: "$799",
      discount: "37% Off",
      warranty: "2 Years",
      offers: [
        "Assured Cashback upto $50 on paying with Credit Cards.",
        "Flat 10% Instant Discount Up to $100 with HDFC Credit Card.",
      ],
      images: [
          assets.SonyTV01,
          assets.SonyTV011,
          assets.SonyTV012,
          assets.SonyTV013,
      ],
    },
    // Add more products as needed
  ];

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div className="text-center text-2xl font-bold mt-10">Product not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Product Details</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 overflow-hidden rounded-lg cursor-pointer border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt="Main Product Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-semibold text-gray-800">{product.price}</p>
              <p className="text-lg text-gray-500 line-through">{product.originalPrice}</p>
              <p className="text-lg text-green-600 font-semibold">{product.discount}</p>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Warranty:</span> {product.warranty}
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Offers</h2>
              <div className="space-y-2">
                {product.offers.map((offer, index) => (
                  <p key={index} className="text-gray-700">
                    {offer}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="w-1/2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <button className="w-1/2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;