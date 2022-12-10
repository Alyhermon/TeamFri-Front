import React from 'react'
import './navbar.scss';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <div className='side'>
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
            <NavLink to='/nominas' className='link' activeclassname='active'>
                <li>
                <i className="fi fi-rr-list-check icon"></i>
                <p>Nominas</p>
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default NavBar