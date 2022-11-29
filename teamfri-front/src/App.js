import './app.scss';
import NavBar from './components/navbar/navbar';
import DashBoard from './components/dashboard/dashboard';
import { Router, Routes, Route } from 'react-router-dom';
import Empleados from './pages/empleados';
import Vacaciones from './pages/vacaciones';
import Nominas from './pages/nominas';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <div className='content'>
          <Routes>
            <Route exact path='/' element={<DashBoard />}/>
            <Route exact path='/empleados' element={<Empleados />} />
            <Route exact path='/vacaciones' element={<Vacaciones />} />
            <Route exact path='/nominas' element={<Nominas />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
