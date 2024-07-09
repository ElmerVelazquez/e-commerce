// CardContext.jsx
import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (product) => {
        // Lógica para añadir producto al carrito
        setCart([...cart, product]);
        setTotalPrice(totalPrice + parseFloat(product.price.replace(/[^\d.-]/g, ''))); // Asumiendo que 'price' es un string con formato 'RD$ XXX'
    };

    const removeFromCart = (productId) => {
        // Lógica para eliminar producto del carrito
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        const updatedTotalPrice = updatedCart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d.-]/g, '')), 0);
        setTotalPrice(updatedTotalPrice);
    };

    const contextValue = {
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
    };

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};
