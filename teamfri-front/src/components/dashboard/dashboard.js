import React from 'react'
import './dashboard.scss'

class DashBoard extends React.Component {
  render(){
    return (
      <div className='dash'>
        <h1>Dashboard</h1>
        <div className='cards'>
          <div className='card'>
            <div className='text'>
              <h1>70</h1> {/*numero representativo */}
              <h3>Empleados</h3>
            </div>
          </div>
          <div className='card'>
            <div className='text'>
              <h1>70</h1>
              <h3>Vacaciones</h3>
            </div>
          </div>
          <div className='card'>
            <div className='text'>
              <h1>70</h1>
              <h3>Nomina</h3>
            </div>
          </div>
        </div>
        <br/>
        <h3>Ultimos Empleados</h3>
        <ul>
          <li><p>Juan Perez</p></li>
        </ul>
      </div>
    )
  }
}

export default DashBoard
