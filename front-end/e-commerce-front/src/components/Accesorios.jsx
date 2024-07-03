import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Buscador from './Buscador';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// Datos de los accesorios
const accesoriosData = [
    {id: 1, name: 'Teclado Rii RK100', description: 'Teclado multimedia para juegos o trabajo de oficina', price: 'RD$ 750', image: '/src/assets/accesorioUno.jpg'},
    {id: 2, name: 'Teclado Logitech', description:' Teclado inalambrico, Bluetooth y USB-C', price: 'RD$ 5, 600', image: '/src/assets/accesorioDos.jpg'},
    {id: 3, name: 'Mouse Razer Basilisk v3', description: 'Mouse Inalambrico con sensor optico e ilumanación', price: 'RD$ 2, 450', image: '/src/assets/accesorioTres.jpg'},
    {id: 4, name: 'AirPods Apple', description:'AirPods con funda de carga', price: 'RD$ 5, 800', image:'/src/assets/accesorioCuatro.jpg'},
    {id: 5, name: 'Auriculares Sony', description: 'Auriculares inalambricos con cancelación de ruido y micrófono', price: 'RD$ 3, 700', image: '/src/assets/accesoriocinco.jpg'},
    {id: 6, name: 'Beats Studio Pro', description:'Auriculares inalambricos con cancelación de ruido, audio espacial y USB-C', price: 'RD$ 7, 800', image:'/src/assets/accesorioSeis.jpg'},
    {id: 7, name: 'Alfombrilla de mouse', description:'Alfombrilla de mouse para pc', price:'RD$ 350', image:'/src/assets/accesorioSiete.jpg'},
    {id: 8, name: 'Alfombrilla con carga inalambrica', description:'Alfombrilla de mouse con carga inalambrica, base de goma antideslizante', price:'RD$ 850', image:'/src/assets/accesorioOcho.jpg'},
    {id: 9, name: 'Teclado Mecánico', description:'Teclado para juegos, retroiluminados con multicolores', price:'RD$ 4, 200', image:'/src/assets/accesorioNueve.jpg'},
    {id: 10, name: 'Soporte para Laptops', description:'Soporte de aluminio para computadoras y con elevador ', price:'RD$ 950', image:'src/assets/accesorioDiez.jpg'},
    {id: 11, name: 'Protector de pantalla para iphone 15 Pro Max', description: 'Protector con privacy, resintes a las caidas', price: 'RD$ 1, 850', image:'/src/assets/accesorioOnce.jpg' },
    {id: 12, name: 'Cover para iphone 12', description:'Covers protector antihuellas dactilares', price:'RD$ 1, 950', image:'/src/assets/accesorioDoce.jpg'},
    {id: 13, name: 'Mouse TECKNET', description:'Mouse Bluetooth, también con conexión USB', price:'RD$ 850', image:'/src/assets/accesorioTrece.jpg'},
    {id: 14, name: 'Teclado y Mouse Lenovo', description:'Teclado y Mouse de cables', price:'RD$ 1, 350', image:'/src/assets/accesorioCatorce.jpg'},
    {id: 15, name: 'Auriculares Apple', description:'Auriculares con cables para Iphone', price:'RD$ 1, 050', image:'src/assets/accesorioQuince.jpg'},
    {id: 16, name: 'Auriculaes Philips', description: 'Auriculares con microfono, ligeros y buen audio', price: 'RD$ 1, 350', image:'/src/assets/accesorioDiesCi.jpg' },
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
            {/* Componente del buscador */}
            <Buscador onSearch={onSearch} />
            {/* Iconos de carrito de compras y usuario */}
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

// Componente para representar una tarjeta de los Accesorios
const AccesoriosCard = ({ accesorios }) => (
    <a href={`/laptops/${accesorios.id}`} className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
        <div className="w-full h-32 mb-4 flex items-center justify-center">
            {/* Imagen del accesorio */}
            <img src={accesorios.image} alt={accesorios.name} className="max-h-full max-w-full object-contain" />
        </div>
        {/* Nombre del accesorio */}
        <h3 className="text-lg font-semibold">{accesorios.name}</h3>
        {/* Descripción del accesorio */}
        <p className="text-sm">{accesorios.description}</p>
        {/* Precio del accesorio */}
        <p className="text-md font-bold mt-2">{accesorios.price}</p>
        <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl" />
    </a>
);

AccesoriosCard.propTypes = {
    accesorios: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los accesorios
function Accesorios() {
    // Estado para almacenar los resultados de la búsqueda
    const [searchResults, setSearchResults] = useState(accesoriosData);

    // Función para manejar la búsqueda de accesorios
    const handleSearch = (searchTerm) => {
        const results = accesoriosData.filter(accesorios =>
            accesorios.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accesorios.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Actualiza los resultados de búsqueda
        setSearchResults(results);
    };

    return (
        <>
            {/* Barra de navegación */}
            <Navbar onSearch={handleSearch} />
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Accesorios</h2>
                {/* Grilla de tarjetas de accesorios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map(accesorios => (
                        <AccesoriosCard key={accesorios.id} accesorios={accesorios} />
                    ))}
                </div>
            </div>
        </> 
    );
}

export default Accesorios;
