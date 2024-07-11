import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';
import Buscador from './Buscador';

// Datos de los teléfonos
const telefonoData = [
    { id: 1, name: 'Iphone 12 Pro', description: '512GB, azul marino y desbloqueado', price: 'RD$ 32,300', image: '/src/assets/telefonoUno.jpg' },
    { id: 2, name: 'Iphone 12', description: '128GB, Negro y desbloqueado', price: 'RD$ 19,000', image: '/src/assets/telefonoDos.jpg' },
    { id: 3, name: 'SAMSUNG Galaxy S24 Ultra', description: '256GB, Gris y desbloqueado', price: 'RD$ 72,000', image: '/src/assets/telefonoTres.jpg' },
    { id: 4, name: 'SAMSUNG Galaxy S24 Ultra', description: '256GB, Violeta, desbloqueado y batería de larga duración', price: 'RD$ 84,000', image: '/src/assets/telefonoCuatro.jpg' },
    { id: 5, name: 'Xiaomi 14 Ultra', description: '512GB, Negro y desbloqueado', price: 'RD$ 72,000', image: '/src/assets/telefonoCinco.jpg' },
    { id: 6, name: 'Google Pixel 7 Pro', description: '256GB, Blanco, desbloqueado y batería de 24 horas', price: 'RD$ 55,000', image: '/src/assets/TelefonoSeis.jpg' },
    { id: 7, name: 'SAMSUNG Galaxy S24', description: '256GB, Negro opaco, desbloqueado y batería de larga duración', price: 'RD$ 55,000', image: '/src/assets/telefonoSiete.jpg' },
    { id: 8, name: 'Iphone 13 Pro', description: '128GB, Azul sierra y desbloqueado', price: 'RD$ 36,400', image: '/src/assets/telefonoOcho.jpg' },
    { id: 9, name: 'Iphone 13', description: '128GB, Negro y desbloqueado', price: 'RD$ 28,000', image:'/src/assets/telefonoNueve.jpg' },
    { id: 10, name: 'SAMSUNG Galaxy A15', description: '128GB, Azul claro y desbloqueado', price: 'RD$ 6,700', image: '/src/assets/telefonoDiez.jpg' },
    { id: 11, name: 'Google Pixel 8a', description: '128GB, Azul Bahía y desbloqueado', price: 'RD$ 19,500', image: '/src/assets/telefonoOnce.jpg' },
    { id: 12, name: 'Telefono Note 17 Pro', description: '256GB, Negro y desbloqueado', price: 'RD$ 14,500', image: '/src/assets/telefonoDoce.jpg' }
];

// Crear el contexto para el carrito de compras
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(product => product.id !== productId));
    };

    const totalPrice = cart.reduce((total, product) => total + parseFloat(product.price.replace('RD$', '').replace(',', '')), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// Componente de la barra de navegación
const Navbar = ({ onSearch }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

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
        <div className="flex bg-red-600 p-8 justify-between items-center">
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

// Componente para representar una tarjeta de teléfono
const TelefonoCard = ({ telefono }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
            <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img src={telefono.image} alt={telefono.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-semibold">{telefono.name}</h3>
            <p className="text-sm">{telefono.description}</p>
            <p className="text-md font-bold mt-2">{telefono.price}</p>
            <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl cursor-pointer" onClick={() => addToCart(telefono)} />
        </div>
    );
};

TelefonoCard.propTypes = {
    telefono: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los teléfonos con el menú lateral
function Telefono() {
    const [searchResults, setSearchResults] = useState(telefonoData);

    const handleSearch = (searchTerm) => {
        const results = telefonoData.filter(telefono =>
            telefono.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            telefono.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <CartProvider>
            <Navbar onSearch={handleSearch} />
            <div className="flex">
                <div className="w-1/5 p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Productos</h2>
                    <ul className='font-bold'>
                        <li className="mb-2"><a href="/Accesorios" className="text-gray-700 hover:text-black">Accesorios</a></li>
                        <li className="mb-2"><a href="/Desktop" className="text-gray-700 hover:text-black">Desktops</a></li>
                        <li className="mb-2"><a href="/Laptos" className="text-gray-700 hover:text-black">Laptops</a></li>
                        <li className="mb-2"><a href="/telefono" className="text-gray-700 hover:text-black">Teléfonos</a></li>
                    </ul>
                </div>
                <div className="w-4/5 p-8">
                    <h2 className="text-2xl font-bold mb-4">Teléfonos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map(telefono => (
                            <TelefonoCard key={telefono.id} telefono={telefono} />
                        ))}
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default Telefono;
