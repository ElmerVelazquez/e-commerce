import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';

// Datos de los desktops
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

// Componente de la barra de navegación para Desktops
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
                placeholder="Buscar desktops..."
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

// Componente para representar una tarjeta de Desktop
const DesktopCard = ({ desktop }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
            <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img src={desktop.image} alt={desktop.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-semibold">{desktop.name}</h3>
            <p className="text-md font-bold mt-2">{desktop.price}</p>
            <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl cursor-pointer" onClick={() => addToCart(desktop)} />
        </div>
    );
};

DesktopCard.propTypes = {
    desktop: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los desktops con el menú lateral
function Desktops() {
    const [searchResults, setSearchResults] = useState(desktopData);

    const handleSearch = (searchTerm) => {
        const results = desktopData.filter(desktop =>
            desktop.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <li className="mb-2"><a href="/telefono" className="text-gray-700 hover:text-black">Telefonos</a></li>
                    </ul>
                </div>
                <div className="w-4/5 p-8">
                    <h2 className="text-2xl font-bold mb-4">Desktops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map(desktop => (
                            <DesktopCard key={desktop.id} desktop={desktop} />
                        ))}
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default Desktops;
