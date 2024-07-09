import React, { useContext } from 'react';
import { CardContext } from './CardContext'; // Asegúrate de importar correctamente el contexto

const CartPage = () => {
    const { cart, totalPrice, removeFromCart } = useContext(CardContext); // Usa useContext para acceder al contexto

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    {cart.map(product => (
                        <div key={product.id}>
                            <img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                            <div>
                                <h3>{product.name}</h3>
                                <p>Precio: {product.price}</p>
                                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                    <p>Total: RD$ {totalPrice.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default CartPage;
