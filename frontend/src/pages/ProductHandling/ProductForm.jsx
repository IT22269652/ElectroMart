import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - selectedImages.length);
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 4));
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...productData, images: selectedImages });
    navigate('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      
      {/* Image Upload Section */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">Upload images (Max 4)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative h-40 border rounded-lg overflow-hidden group">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Preview ${index}`} 
                className="w-full h-full object-cover"
              />
              <button 
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
          
          {selectedImages.length < 4 && (
            <div 
              className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={triggerFileInput}
            >
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="text-sm text-gray-500">Add Image</span>
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

      {/* Product Name */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Product name</label>
        <input 
          type="text" 
          name="name"
          placeholder="Type here" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {/* Product Description */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Product description</label>
        <textarea 
          name="description"
          placeholder="Write content here" 
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={productData.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      
      {/* Category and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Product category</label>
          <select 
            name="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-gray-700 font-medium mb-2">Product Price ($)</label>
          <input 
            type="number" 
            name="price"
            placeholder="Enter price" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button 
          type="submit"
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductForm;