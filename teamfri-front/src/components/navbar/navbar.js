import React from 'react'
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import logo from './media/employee.png';
import Swal from 'sweetalert2';

function NavBar() {

  return (
    <div className='side'>
        <div className='logo'>
            <img src={logo}/>
        </div>
        <ul>
            <NavLink to='/' className='link' activeclassname='active'>
                <li>
                <i className="fi fi-rr-dashboard icon"></i>
                <p>Dashboard</p>
                </li>
            </NavLink>
            <NavLink to='/empleados' className='link' activeclassname='active'>
                <li>
                <i className="fi fi-rr-users-alt icon"></i>
                <p>Empleados</p>
                </li>
            </NavLink>
            <NavLink to='/vacaciones' className='link' activeclassname='active'>
                <li>
                <i className="fi fi-rr-calendar icon"></i>
                <p>Vacaciones</p>
                </li>
            </NavLink>
            <NavLink to='/nominas' className='link' onClick={() => this.message('Apartado no disponible','Actualmente nominas no se encuentra en funcionamiento para el publico','error')}>
                <li className='link'>
                <i className="fi fi-rr-list-check icon"></i>
                <p>Nominas</p>
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default NavBar