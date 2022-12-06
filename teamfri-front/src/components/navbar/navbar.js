import React from 'react'
import './navbar.scss';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <div className='side'>
        <ul>
            <NavLink to='/' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="home-outline" className="icon"></ion-icon>
                Dashboard
                </li>
            </NavLink>
            <NavLink to='/empleados' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="people-outline" className="icon"></ion-icon>
                Empleados
                </li>
            </NavLink>
            <NavLink to='/vacaciones' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="calendar-outline" className="icon"></ion-icon>
                Vacaciones
                </li>
            </NavLink>
            <NavLink to='/nominas' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="document-text-outline" className="icon"></ion-icon>
                Nominas
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default NavBar