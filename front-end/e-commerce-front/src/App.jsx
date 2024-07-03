
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import './index.css';
import Laptops from './components/Laptos';
import Telefono from './components/Telefono';
import Accesorios from './components/Accesorios';
import Desktop from './components/Desktop';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='laptops' element={<Laptops />} />
          <Route path='telefono' element={<Telefono />} />
          <Route path='accesorios' element={<Accesorios />} />
          <Route path='desktop' element={<Desktop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
