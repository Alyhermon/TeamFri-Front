import React from 'react'
import './navbar.scss';

function NavBar() {
  return (
            <div className='side'>
                <ul>
                    <li>
                        <ion-icon size='large' name="home-outline" className="icon"></ion-icon>
                        Dashboard
                    </li>
                    <li>
                        <ion-icon size='large' name="people-outline" className="icon"></ion-icon>
                        Empleados
                    </li>
                    <li>
                        <ion-icon size='large' name="calendar-outline" className="icon"></ion-icon>
                        Vacaciones
                    </li>
                    <li>
                        <ion-icon size='large' name="document-text-outline" className="icon"></ion-icon>
                        Nominas
                    </li>
                </ul>
            </div>
  )
}

export default NavBar