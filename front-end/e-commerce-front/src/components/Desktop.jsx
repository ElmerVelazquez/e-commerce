import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Buscador from './Buscador';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// Datos de los accesorios
const desktopData = [
    {id: 1, name: 'Desktop Thermaltake', description: 'Windows 11, 2,5 GHz, 128GB y 16 RAM', price: 'RD$ 53, 100', image: '/src/assets/desktopUno.jpg'},
    {id: 2, name: 'Desktop Skytech Gaming', description:'Core i5, 2.5 GHz, 1TB y 16G RAM', price: 'RD$ 50, 600', image: '/src/assets/desktopDos.jpg'},
    {id: 3, name: 'Desktop CyberpowerPC ', description: 'Windows 11, core i7, 2.1 GHz, 1TB y 16 RAM', price: 'RD$ 76, 7000', image: '/src/assets/desktopTres.jpg'},
    {id: 4, name: 'Desktop Asus', description:'Windows 11, core i5, 512GB, 8G RAM', price: 'RD$ 44, 190', image:'/src/assets/desktopCuatro.jpg'},
    {id: 5, name: 'Desktop Dell optiplex', description: 'core i7, 3.9 GHz, 1TB y 32 RAM', price: 'RD$ 12, 000', image: '/src/assets/Desktopcinco.jpg'},
    {id: 6, name: 'Desktop Inspiron 3020S', description:'core i5, 512GB + disco duro de 1TB y 16 RAM', price: 'RD$ 29, 800', image:'/src/assets/desktopSeis.jpg'},
    {id: 7, name: 'Desktop Dell Vostro 3000', description:'core i7, 512GB Y 32 RAM', price:'RD$ 22, 500', image:'/src/assets/desktopSiete.jpg'},
    {id: 8, name: 'Dekptop BUYPOWER Y40 ', description:'Core i7, RTX 4060Ti, 1TB y 32 RAM', price:'RD$ 94, 400', image:'/src/assets/DesktopOcho.jpg'},
    {id: 9, name: 'Desktop Dell XPS 8950', description:'Core i7, 512GB Y 32 RAM', price:'RD$ 30, 000', image:'/src/assets/DesktopNueve.jpg'},
    {id: 10, name: 'Desktop Dell XPS 8960', description:'Windows 11 pro, core i7, 5.40GHz, 4TB y 64 RAM', price:'RD$ 48, 500', image:'src/assets/desktopDiez.jpg'},
    {id: 11, name: 'Desktop optiplex 3080', description: 'Core i5, 2.3GHz 512GB Y 16 RAM', price: 'RD$ 42,  900 ', image:'/src/assets/desktopOnce.jpg' },
    {id: 12, name: 'Desktop Asus ExpertCenter', description:'Windows 11 Pro, core i7, 1TB y 16 RAM', price:'RD$ 48, 380', image:'/src/assets/desktopDoce.jpg'},
];

// Componente de la barra de navegación
const Navbar = ({ onSearch }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Función para abrir/cerrar el menú de usuario
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Cerrar el menú de usuario si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex bg-red-600 p-6 justify-between items-center">
            <h1 className="text-white text-2xl font-bold">
                <a href="/">LincolnTech</a>
            </h1>
            <Buscador onSearch={onSearch} />
            <div className="flex items-center space-x-10 relative">
                <FaShoppingCart className="text-white text-2xl" />
                <FaUser className="text-white text-2xl cursor-pointer" onClick={toggleUserMenu} />
                {isUserMenuOpen && (
                    <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Iniciar Sesión</a>
                        <a href="/registro" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Registrarse</a>
                    </div>
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

// Componente para representar una tarjeta de los Desktops
const DesktopCard = ({ desktop }) => (
    <a href={`/desktops/${desktop.id}`} className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
        <div className="w-full h-32 mb-4 flex items-center justify-center">
            {/* Imagen del desktop */}
            <img src={desktop.image} alt={desktop.name} className="max-h-full max-w-full object-contain" />
        </div>
        {/* Nombre del Desktop */}
        <h3 className="text-lg font-semibold">{desktop.name}</h3>
        {/* Descripción del Desktop */}
        <p className="text-sm">{desktop.description}</p>
        {/* Precio del Desktop */}
        <p className="text-md font-bold mt-2">{desktop.price}</p>
        <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl" />
    </a>
);

DesktopCard.propTypes = {
    desktop: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los desktops
function Desktop() {
    // Estado para almacenar los resultados de la búsqueda
    const [searchResults, setSearchResults] = useState(desktopData);

    // Función para manejar la búsqueda de desktops
    const handleSearch = (searchTerm) => {
        const results = desktopData.filter(desktop =>
            desktop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            desktop.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Actualiza los resultados de búsqueda
        setSearchResults(results);
    };

    return (
        <>
            {/* Barra de navegación */}
            <Navbar onSearch={handleSearch} />
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Desktops</h2>
                {/* Grilla de tarjetas desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map(desktop => (
                        <DesktopCard key={desktop.id} desktop={desktop} />
                    ))}
                </div>
            </div>
        </> 
    );
}

export default Desktop;
