// src/components/Buscador.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="relative flex items-center w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="p-2 pl-10 w-full bg-white text-black rounded-md focus:outline-none"
      />
      <FaSearch className="absolute right-3 text-black" />
    </div>
  );
};

export default Buscador;
