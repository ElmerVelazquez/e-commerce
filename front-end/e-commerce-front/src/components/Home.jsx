// src/pages/Home.js
import React, { useState, useRef, useEffect } from 'react';
import Buscador from './Buscador';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Footer from '../components/Footer'; // Importa el Footer

// Importación de imágenes
import frontUno from '../assets/frontUno.png';
import frontDos from '../assets/frontDos.png';
import fronTres from '../assets/fronTres.png';
import frontCinco from '../assets/frontCinco.jpg';
import frontApple from '../assets/frontApple.jpg';
import frontLenovo from '../assets/frontLenovo.jpg';
import frontDell from '../assets/frontDell.jpg';
import frontHp from '../assets/frontHp.jpg';
import frontIphone from '../assets/frontIphone.jpg';
import frontSan from '../assets/frontSan.jpg';
import telefonoHuawei from '../assets/telefonoHuawei.jpg';
import frontXiaomi from '../assets/frontXiaomi.jpg';
import frontTeclado from '../assets/frontTeclado.jpg';
import frontMouse from '../assets/frontMouse.jpg';
import frontMousePad from '../assets/frontMousePad.jpg';
import frontAudi from '../assets/frontAudi.jpg';
import frontDeskUno from '../assets/frontDeskUno.jpg';
import frontDeskDos from '../assets/frontDeskDos.jpg';
import frontDeskTres from '../assets/frontDeskTres.jpg';
import frontDeskCuatro from '../assets/frontDeskCuatro.jpg';

const productos = [
  { id: 1, name: 'Telefono 1', image: frontUno, category: 'telefono' },
  { id: 2, name: 'Telefono 2', image: frontDos, category: 'telefono' },
  { id: 3, name: 'Telefono 3', image: fronTres, category: 'telefono' },
  { id: 4, name: 'Telefono 4', image: frontCinco, category: 'telefono' },
  { id: 5, name: 'Laptop MacBook', image: frontApple, category: 'laptop' },
  { id: 6, name: 'Laptop Lenovo', image: frontLenovo, category: 'laptop' },
  { id: 7, name: 'Laptop Dell', image: frontDell, category: 'laptop' },
  { id: 8, name: 'Laptop HP', image: frontHp, category: 'laptop' },
  { id: 9, name: 'iPhone', image: frontIphone, category: 'telefono' },
  { id: 10, name: 'Teléfono Samsung', image: frontSan, category: 'telefono' },
  { id: 11, name: 'Teléfono Huawei', image: telefonoHuawei, category: 'telefono' },
  { id: 12, name: 'Teléfono Xiaomi', image: frontXiaomi, category: 'telefono' },
  { id: 13, name: 'Teclado', image: frontTeclado, category: 'accesorio' },
  { id: 14, name: 'Mouse', image: frontMouse, category: 'accesorio' },
  { id: 15, name: 'MousePad', image: frontMousePad, category: 'accesorio' },
  { id: 16, name: 'Audífonos inalámbricos', image: frontAudi, category: 'accesorio' },
  { id: 17, name: 'Desktop Gaming', image: frontDeskUno, category: 'desktop' },
  { id: 18, name: 'Desktop gaming con teclado y mouse', image: frontDeskDos, category: 'desktop' },
  { id: 19, name: 'Desktop', image: frontDeskTres, category: 'desktop' },
  { id: 20, name: 'Desktop Gaming 2', image: frontDeskCuatro, category: 'desktop' },
];

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    const results = productos.filter((producto) =>
      producto.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
    console.log('Buscando:', query, 'Resultados:', results);
  };

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
    <>
      {/* Sección del navbar */}
      <div className="flex bg-red-600 p-6 justify-between items-center">
        <h1 className="text-white text-2xl font-bold hover:text-black">
          <a href="/">LincolnTech</a>
        </h1>
        {/* Componente del buscador */}
        <Buscador onSearch={handleSearch} />
        {/* Iconos de carrito de compras y usuario */}
        <div className="flex items-center space-x-10 relative">
          <FaShoppingCart className="text-white text-2xl cursor-pointer" />
          <FaUser className="text-white text-2xl cursor-pointer" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Iniciar Sesión</a>
              <a href="/registro" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Registrarse</a>
            </div>
          )}
        </div>
      </div>

      {/* Mostrar resultados de búsqueda si hay una búsqueda activa */}
      {isSearching ? (
        <section className="grid grid-cols-4 gap-x-0 justify-items-center m-2">
          {searchResults.length > 0 ? (
            searchResults.map((producto) => (
              <img
                key={producto.id}
                src={producto.image}
                alt={producto.name}
                className="max-w-full border border-gray-300"
              />
            ))
          ) : (
            <p className="col-span-4 text-center">No se encontraron resultados</p>
          )}
        </section>
      ) : (
        <>
          {/* Sección de las imágenes */}
          <section className="grid grid-cols-4 gap-x-0 justify-items-center m-2">
            {productos.filter(producto => producto.category === 'telefono').slice(0, 4).map((producto) => (
              <img
                key={producto.id}
                src={producto.image}
                alt={producto.name}
                className="max-w-full border border-gray-300"
              />
            ))}
          </section>

          {/* Sección de Laptops */}
          <section>
            <h2 className="mt-5 ml-5 font-bold hover:text-red-600">
              <a href="/laptops">Ver Laptops</a>
            </h2>
            <div className="grid grid-cols-4 justify-center mx-auto mt-10 w-3/4">
              {productos.filter(producto => producto.category === 'laptop').map((producto) => (
                <a key={producto.id} href={`/laptops/${producto.id}`}>
                  <img src={producto.image} alt={producto.name} className="" />
                </a>
              ))}
            </div>
          </section>

          {/* Sección de celulares */}
          <section>
            <h2 className='mt-5 ml-5 font-bold hover:text-red-600'>
              <a href="/telefono">Ver Teléfonos Móviles</a>
            </h2>
            <div className="grid grid-cols-4 justify-center mx-auto mt-10 w-3/4">
              {productos.filter(producto => producto.category === 'telefono').slice(4).map((producto) => (
                <a key={producto.id} href={`/telefonos/${producto.id}`}>
                  <img src={producto.image} alt={producto.name} className="" />
                </a>
              ))}
            </div>
          </section>

          {/* Sección de Accesorios */}
          <section>
            <h2 className='mt-5 ml-5 font-bold hover:text-red-600'>
              <a href="/accesorios">Ver Accesorios</a>
            </h2>
            <div className="grid grid-cols-4 gap-5 justify-center mx-auto mt-10 w-3/4">
              {productos.filter(producto => producto.category === 'accesorio').map((producto) => (
                <a key={producto.id} href={`/accesorios/${producto.id}`}>
                  <img src={producto.image} alt={producto.name} className="" />
                </a>
              ))}
            </div>
          </section>

          {/* Sección de Computadoras de escritorio */}
          <section>
            <h2 className='mt-5 ml-5 font-bold hover:text-red-600'>
              <a href="/desktop">Ver Desktops</a>
            </h2>
            <div className="grid grid-cols-4 gap-5 justify-center mx-auto mt-10 w-3/4">
              {productos.filter(producto => producto.category === 'desktop').map((producto) => (
                <a key={producto.id} href={`/desktop/${producto.id}`}>
                  <img src={producto.image} alt={producto.name} className="" />
                </a>
              ))}
            </div>
          </section>
        </>
      )}
      {/*Sección footer*/}
      <Footer /> 
    </>
  );
}

export default Home;
