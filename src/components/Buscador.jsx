import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Buscador = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda
  const [query, setQuery] = useState('');

  // Maneja los cambios en el campo de búsqueda
  const handleInputChange = (event) => {
    // Actualiza el estado con el nuevo valor del campo de búsqueda
    setQuery(event.target.value);
    // Llama a la función onSearch pasada como prop para actualizar los resultados de búsqueda en el componente padre
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
