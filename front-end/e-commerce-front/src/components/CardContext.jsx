// CardContext.jsx
import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (product) => {
        // Assuming 'price' is a string with format 'RD$ XXX'
        const price = parseFloat(product.price.replace(/[^\d.-]/g, ''));
        setCart([...cart, product]);
        setTotalPrice(totalPrice + price);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        const updatedTotalPrice = updatedCart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d.-]/g, '')), 0);
        setCart(updatedCart);
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
