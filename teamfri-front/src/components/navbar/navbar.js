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
                <p>Dashboard</p>
                </li>
            </NavLink>
            <NavLink to='/empleados' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="people-outline" className="icon"></ion-icon>
                <p>Empleados</p>
                </li>
            </NavLink>
            <NavLink to='/vacaciones' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="calendar-outline" className="icon"></ion-icon>
                <p>Vacaciones</p>
                </li>
            </NavLink>
            <NavLink to='/nominas' className='link' activeclassname='active'>
                <li>
                <ion-icon size='large' name="document-text-outline" className="icon"></ion-icon>
                <p>Nominas</p>
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default NavBar