// SidebarMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Categorías</h2>
            <ul className="space-y-4">
                <li>
                    <Link to="/accesorios" className="hover:underline">
                        Accesorios
                    </Link>
                </li>
                <li>
                    <Link to="/desktops" className="hover:underline">
                        Desktops
                    </Link>
                </li>
                <li>
                    <Link to="/laptos" className="hover:underline">
                        Laptops
                    </Link>
                </li>
                <li>
                    <Link to="/telefono" className="hover:underline">
                        Teléfonos Móviles
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMenu;
