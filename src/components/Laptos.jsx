import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Buscador from './Buscador';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// Datos de las laptops
const laptopsData = [
    { id: 1, name: 'MacBook Air 2020', description: 'm3, 8GB Ram, 512 SSD, Cámara hd y Bluetooth', price: 'RD$ 65,000', image: '/src/assets/laptoUno.jpg' },
    { id: 2, name: 'Lenovo Laptop', description: '8GB RAM, i7, 256 SSD, Huella, cámara HD y Bluetooth', price: 'RD$ 26,000', image: '/src/assets/laptoDos.jpg' },
    { id: 3, name: 'Acer Aspire 5 Slim', description: 'Ryzen 3, 4GB RAM, 128 SSD, Cámara HD y Bluetooth', price: 'RD$ 22,000', image: '/src/assets/laptoTres.jpg' },
    { id: 4, name: 'Lenovo Laptop', description: '4GB RAM, i3, 128 SSD, Cámara HD Y Bluetooth', price: 'RD$ 16,000', image: '/src/assets/laptoCuatro.jpg' },
    { id: 5, name: 'Lenovo Laptop', description: '16GB RAM, 512 SSD, i7, Cámara HD y Bluetooth', price: 'RD$ 56,000', image: '/src/assets/laptoCinco.jpg' },
    { id: 6, name: 'MacBook Pro', description: 'M3, 11 Núcleos, 18GB RAM, 512 SSD, Cámara HD y Bluetooth', price: 'RD$ 82,000', image: '/src/assets/laptoSeis.jpg' },
    { id: 7, name: 'Asus Gaming', description: '12 Núcleos, 18GB RAM, 1TB SSD, Cámara HD y Bluetooth', price: 'RD$ 75,000', image: '/src/assets/laptoSiete.jpg' },
    { id: 8, name: 'Asus Vivobook', description: 'i5, 36GB RAM, 2TB SSD, Cámara HD y Bluetooth', price: 'RD$ 65,000', image: '/src/assets/laptoOcho.jpg' },
    { id: 9, name: 'Lenovo Legion 5i', description: 'Gaming Laptop, i7, 8GB RAM, NVIDIA GeForce RTX 3050 Ti Graphics', price: 'RD$ 96,000', image: '/src/assets/laptoNueve.jpg' },
    { id: 10, name: 'HP 17', description: '32GB RAM, 1TB SSD, Cámara HD y Bluetooth', price: 'RD$ 28,000', image: '/src/assets/laptoDiez.jpg' },
    { id: 11, name: 'MacBook Air', description: 'M3, 8GB RAM, 256 SSD, Cámara HD y Bluetooth', price: 'RD$ 63,000', image: '/src/assets/laptoOnce.jpg' },
    { id: 12, name: 'Dell Inspiron', description: '16GB RAM, 256 SSD, Cámara HD y Bluetooth', price: 'RD$ 30,000', image: '/src/assets/laptoDoce.jpg' },
];

// Componente de la barra de navegación
const Navbar = ({ onSearch }) => (
    <div className="flex bg-red-600 p-8 justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
            <a href="/">LincolnTech</a>
        </h1>
        <Buscador onSearch={onSearch} />
        <div className="flex items-center space-x-10">
            <FaShoppingCart className="text-white text-2xl" />
            <FaUser className="text-white text-2xl" />
        </div>
    </div>
);

Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

// Componente para representar una tarjeta de laptop
const LaptopCard = ({ laptop }) => (
    <a href={`/laptops/${laptop.id}`} className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
        <div className="w-full h-32 mb-4 flex items-center justify-center">
            <img src={laptop.image} alt={laptop.name} className="max-h-full max-w-full object-contain" />
        </div>
        <h3 className="text-lg font-semibold">{laptop.name}</h3>
        <p className="text-sm">{laptop.description}</p>
        <p className="text-md font-bold mt-2">{laptop.price}</p>
        <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl" />
    </a> 
);

LaptopCard.propTypes = {
    laptop: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza las laptops
function Laptops() {
    const [searchResults, setSearchResults] = useState(laptopsData);

    // Función para manejar la búsqueda de laptops
    const handleSearch = (searchTerm) => {
        const results = laptopsData.filter(laptop =>
            laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            laptop.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Laptops</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map(laptop => (
                        <LaptopCard key={laptop.id} laptop={laptop} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Laptops;
