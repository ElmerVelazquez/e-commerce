import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';

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
                placeholder="Buscar laptops..."
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

// Componente para representar una tarjeta de laptop
const LaptopCard = ({ laptop }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
            <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img src={laptop.urlImg} alt={laptop.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-semibold">{laptop.name}</h3>
            <p className="text-md font-bold mt-2">RD$ {laptop.price.toLocaleString('en-US')}</p>
            <FaShoppingCart className="absolute bottom-4 right-4 text-black text-3xl cursor-pointer" onClick={() => addToCart(laptop)} />
        </div>
    );
};

LaptopCard.propTypes = {
    laptop: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        urlImg: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza las laptops con el menú lateral
function Laptops() {
    const [initialProducts, setInitialProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_PRODUCT_URL) // Cambia la URL por la de tu API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.isSuccess) {
                    // Verificar que los productos existan y estén definidos
                    const allProducts = data.value || [];
                    setInitialProducts(allProducts);
                    setSearchResults(allProducts);
                } else {
                    throw new Error(data.errorMessage);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        const results = initialProducts.filter(laptop =>
            laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <CartProvider>
            <Navbar onSearch={handleSearch} />
            <div className="flex">
                <div className="w-1/5 p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Categorías</h2>
                    <ul className='font-bold'>
                        <li className="mb-2"><a href="/Accesorios" className="text-gray-700 hover:text-black">Accesorios</a></li>
                        <li className="mb-2"><a href="/Desktop" className="text-gray-700 hover:text-black">Desktops</a></li>
                        <li className="mb-2"><a href="/Laptos" className="text-gray-700 hover:text-black">Laptops</a></li>
                        <li className="mb-2"><a href="/" className="text-gray-700 hover:text-black">Telefonos</a></li>
                    </ul>
                </div>
                <div className="w-4/5 p-8">
                    <h2 className="text-2xl font-bold mb-4">Laptops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map(laptop => (
                            <LaptopCard key={laptop.id} laptop={laptop} />
                        ))}
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default Laptops;
