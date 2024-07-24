import React from 'react';

const SidebarMenu = () => {
  return (
    <div className="w-64 h-full bg-gray-200 p-4">
      <h2 className="font-bold text-lg mb-4">Productos</h2>
      <ul>
        <li className="mb-2">
          <a href="/accesorios" className="text-gray-700 hover:text-black">Accesorios</a>
        </li>
        <li className="mb-2">
          <a href="desktop" className="text-gray-700 hover:text-black">Desktops</a>
        </li>
        <li className="mb-2">
          <a href="laptos" className="text-gray-700 hover:text-black">Laptops</a>
        </li>
        <li className="mb-2">
          <a href="telefono" className="text-gray-700 hover:text-black">Teléfonos</a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
