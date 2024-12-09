"use client";

import React, { useState } from "react";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Updated to handle file upload
  const [images, setImages] = useState([]); // Updated to handle multiple file uploads
  const [products, setProducts] = useState([]);

  // Handle form submission
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Create URLs for the uploaded images
    const thumbnailUrl = thumbnail ? URL.createObjectURL(thumbnail) : "";
    const imageUrls = Array.from(images).map((image) =>
      URL.createObjectURL(image)
    );

    const newProduct = {
      id: Date.now(),
      title,
      description,
      price,
      discountPercentage: discount,
      stock,
      brand,
      category,
      thumbnail: thumbnailUrl,
      images: imageUrls,
    };

    setProducts([...products, newProduct]);

    // Clear form inputs
    setTitle("");
    setDescription("");
    setPrice("");
    setDiscount("");
    setStock("");
    setBrand("");
    setCategory("");
    setThumbnail(null);
    setImages([]);
  };

  // Handle delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle edit product
  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setTitle(productToEdit.title);
    setDescription(productToEdit.description);
    setPrice(productToEdit.price);
    setDiscount(productToEdit.discountPercentage);
    setStock(productToEdit.stock);
    setBrand(productToEdit.brand);
    setCategory(productToEdit.category);
    setThumbnail(null);
    setImages([]);
    handleDeleteProduct(id);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Products</h1>

      {/* Product Form */}
      <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter product title"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Discount Percentage</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter discount percentage"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter stock quantity"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter product brand"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter product category"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {/* Product Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Thumbnail</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
