import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';

// Datos de los accesorios
const accessoryData = [
    { id: 1, name: 'Teclado Rii RK100', price: 'RD$ 750', image: '/src/assets/accesorioUno.jpg' },
    { id: 2, name: 'Teclado Logitech', price: 'RD$ 5,600', image: '/src/assets/accesorioDos.jpg' },
    { id: 3, name: 'Mouse Razer Basilisk v3', price: 'RD$ 2,450', image: '/src/assets/accesorioTres.jpg' },
    { id: 4, name: 'AirPods Apple', price: 'RD$ 5,800', image:'/src/assets/accesorioCuatro.jpg' },
    { id: 5, name: 'Auriculares Sony', price: 'RD$ 3,700', image: '/src/assets/accesoriocinco.jpg' },
    { id: 6, name: 'Beats Studio Pro', price: 'RD$ 7,800', image:'/src/assets/accesorioSeis.jpg' },
    { id: 7, name: 'Alfombrilla de mouse', price:'RD$ 350', image:'/src/assets/accesorioSiete.jpg' },
    { id: 8, name: 'Alfombrilla con carga inalambrica', price:'RD$ 850', image:'/src/assets/accesorioOcho.jpg' },
    { id: 9, name: 'Teclado Mecánico', price:'RD$ 4,200', image:'/src/assets/accesorioNueve.jpg' },
    { id: 10, name: 'Soporte para Laptops', price:'RD$ 950', image:'src/assets/accesorioDiez.jpg' },
    { id: 11, name: 'Protector de pantalla para iphone 15 Pro Max', price: 'RD$ 1,850', image:'/src/assets/accesorioOnce.jpg' },
    { id: 12, name: 'Cover para iphone 12', price:'RD$ 1,950', image:'/src/assets/accesorioDoce.jpg' },
    { id: 13, name: 'Mouse TECKNET', price:'RD$ 850', image:'/src/assets/accesorioTrece.jpg' },
    { id: 14, name: 'Teclado y Mouse Lenovo', price:'RD$ 1,350', image:'/src/assets/accesorioCatorce.jpg' },
    { id: 15, name: 'Auriculares Apple', price:'RD$ 1,050', image:'src/assets/accesorioQuince.jpg' },
    { id: 16, name: 'Auriculares Philips', price: 'RD$ 1,350', image:'/src/assets/accesorioDiesCi.jpg' },
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

// Componente de la barra de navegación para Accesorios
const Navbar = ({ onSearch }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const userMenuRef = useRef(null);
    const cartRef = useRef(null);
    const { cart, removeFromCart, totalPrice } = useContext(CartContext);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
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
            <input
                type="text"
                placeholder="Buscar accesorios..."
                onChange={(e) => onSearch(e.target.value)}
                className="p-2 rounded-md"
            />
            <div className="flex items-center space-x-10 relative">
                <div className="relative">
                    <FaShoppingCart className="text-white text-2xl cursor-pointer" onClick={toggleCart} />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>
                    )}
                    {isCartOpen && (
                        <div ref={cartRef} className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-10">
                            <h2 className="text-lg font-bold mb-2">Carrito de Compras</h2>
                            {cart.length === 0 ? (
                                <p className="text-gray-700">Tu carrito está vacío</p>
                            ) : (
                                <div>
                                    {cart.map(product => (
                                        <div key={product.id} className="flex justify-between items-center mb-2">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                                            <div className="flex-1 ml-2">
                                                <h3 className="text-sm font-semibold">{product.name}</h3>
                                                <p className="text-sm">{product.price}</p>
                                            </div>
                                            <FaTrash className="text-red-600 cursor-pointer" onClick={() => removeFromCart(product.id)} />
                                        </div>
                                    ))}
                                    <div className="text-right mt-2 font-bold">
                                        Total: RD$ {totalPrice.toFixed(2)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
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

// Componente para representar una tarjeta de accesorio
const AccessoryCard = ({ accessory }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
            <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img src={accessory.image} alt={accessory.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-semibold">{accessory.name}</h3>
            <p className="text-md font-bold mt-2">{accessory.price}</p>
            <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl cursor-pointer" onClick={() => addToCart(accessory)} />
        </div>
    );
};

AccessoryCard.propTypes = {
    accessory: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los accesorios con el menú lateral
function Accessories() {
    const [searchResults, setSearchResults] = useState(accessoryData);

    const handleSearch = (searchTerm) => {
        const results = accessoryData.filter(accessory =>
            accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <CartProvider>
            <Navbar onSearch={handleSearch} />
            <div className="flex">
                <div className="w-1/5 p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Productos</h2>
                    <ul>
                        <li className="mb-2"><a href="/Accesorios" className="text-gray-700 hover:text-black">Accesorios</a></li>
                        <li className="mb-2"><a href="/Desktop" className="text-gray-700 hover:text-black">Desktops</a></li>
                        <li className="mb-2"><a href="/Laptos" className="text-gray-700 hover:text-black">Laptops</a></li>
                        <li className="mb-2"><a href="/telefono" className="text-gray-700 hover:text-black">Telefonos</a></li>
                    </ul>
                </div>
                <div className="w-4/5 p-8">
                    <h2 className="text-2xl font-bold mb-4">Accesorios</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map(accessory => (
                            <AccessoryCard key={accessory.id} accessory={accessory} />
                        ))}
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default Accessories;
