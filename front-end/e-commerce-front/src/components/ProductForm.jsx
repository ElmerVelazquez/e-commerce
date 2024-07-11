import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
  const [product, setProduct] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md rounded w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">{initialData ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Nombre del Producto</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del Producto"
          value={product.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 mb-2">Descripción</label>
        <textarea
          name="description"
          id="description"
          placeholder="Descripción del Producto"
          value={product.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 mb-2">Precio</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Precio del Producto"
          value={product.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 mb-2">Imagen (URL)</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="URL de la Imagen"
          value={product.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
      >
        {initialData ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
