import Buscador from './Buscador';
import { FaShoppingCart, FaUser, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
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

function Home() {
  const handleSearch = (query) => {
    console.log('Buscando:', query);
  };

  return (
    <>
      {/* Sección del navbar */}
      <div className="flex bg-red-600 p-8 justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <a href="/">LincolnTech</a>
        </h1>
        <Buscador onSearch={handleSearch} />
        <div className="flex items-center space-x-10">
          <FaShoppingCart className="text-white text-2xl" />
          <FaUser className="text-white text-2xl" />
        </div>
      </div>

      {/* Sección de las imágenes */}
      <section className="grid grid-cols-4 gap-x-0 justify-items-center m-2">
        <img src={frontUno} alt="telefono" className="max-w-full border border-gray-300" />
        <img src={frontDos} alt="Telefono" className="max-w-full border border-gray-300" />
        <img src={fronTres} alt="Telefono" className="max-w-full border border-gray-300" />
        <img src={frontCinco} alt="Telefono" className="max-w-full border border-gray-300" />
      </section>

      {/*Sección de Laptops */}
      <section className="">
        <h2 className="mt-5 ml-5 font-bold">
          <a href="/laptops">Ver Laptops</a>
        </h2>
        <div className="grid grid-cols-4 justify-center mx-auto mt-10 w-3/4">
          <a href=""><img src={frontApple} alt="Lapto Mcbook" className="" /></a>
          <a href=""><img src={frontLenovo} alt="Lapto lenovo" className="" /></a>
          <a href=""><img src={frontDell} alt="Laptop Dell" className="" /></a>
          <a href=""><img src={frontHp} alt="Laptop HP" className="" /></a>
        </div>
      </section>

      {/*Sección de celulares*/}
      <section>
        <h2 className='mt-5 ml-5 font-bold'>
          <a href="">Ver Telefonos Moviles</a>
        </h2>
        <div className="grid grid-cols-4 justify-center mx-auto mt-10 w-3/4">
          <a href=""><img src={frontIphone} alt="Laptop McBook" className="" /></a>
          <a href=""><img src={frontSan} alt="Telefono Samsung" className="" /></a>
          <a href=""><img src={telefonoHuawei} alt="Telefono Huawei" className="" /></a>
          <a href=""><img src={frontXiaomi} alt="Telefono Xiaomi" className="" /></a>
        </div>
      </section>

      {/*Sección de Accesorios*/}
      <section>
        <h2 className='mt-5 ml-5 font-bold'>
          <a href="">Ver Accesorios</a>
        </h2>
        <div className="grid grid-cols-4 gap-5 justify-center mx-auto mt-10 w-3/4">
          <a href=""><img src={frontTeclado} alt="Teclado" className="" /></a>
          <a href=""><img src={frontMouse} alt="Mouse" className="" /></a>
          <a href=""><img src={frontMousePad} alt="MousePad" className="" /></a>
          <a href=""><img src={frontAudi} alt="Audifonos inalambricos" className="" /></a>
        </div>
      </section>

      {/*Sección de Desktop*/}
      <section>
        <h2 className='mt-5 ml-5 font-bold'>
          <a href="">Ver Desktop</a>
        </h2>
        <div className="grid grid-cols-4 gap-5 justify-center mx-auto mt-10 w-3/4">
          <a href=""><img src={frontDeskUno} alt="Desktop Gaming" className="" /></a>
          <a href=""><img src={frontDeskDos} alt="Desktop gamin con teclado y mouse" className="" /></a>
          <a href=""><img src={frontDeskTres} alt="Desktop" className="" /></a>
          <a href=""><img src={frontDeskCuatro} alt="Desktop Gamin" className="" /></a>
        </div>
      </section>

      {/*Footer*/}
      <footer className='bg-red-600 p-7'>
        <div className='flex justify-end space-x-6 mr-6'>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className='text-white text-2xl' />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className='text-white text-2xl' />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className='text-white text-2xl' />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home;
