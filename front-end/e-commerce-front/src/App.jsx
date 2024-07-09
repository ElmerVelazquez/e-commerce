import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import './index.css';
import Laptos from './components/Laptos';
import Telefono from './components/Telefono';
import Accesorios from './components/Accesorios';
import Desktop from './components/Desktop';
import CartPage from './components/CartPage'; 

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/laptos' element={<Laptos />} />
          <Route path='/telefono' element={<Telefono />} />
          <Route path='/accesorios' element={<Accesorios />} />
          <Route path='/desktop' element={<Desktop />} />
          <Route path='/cart' element={<CartPage />} /> 
          {/* <Route path='/' element={<Login />} />  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
