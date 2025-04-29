import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState([]);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle quantity update
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/tech-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Shopping Cart
        </h1>

        {/* Cart Items Section */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">Your cart is empty</p>
              <Link to="/">
                <button
                  className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 transition duration-200"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 text-center border-t border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 transition duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 mt-2 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Total and Checkout */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    ${calculateTotal()}
                  </span>
                </div>
                <Link to="/delivery" state={{ cartItems }}>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;