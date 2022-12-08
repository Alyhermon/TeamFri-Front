import React from 'react'
import './dashboard.scss'
import axios from 'axios';

const url = 'https://localhost:44338/api/User';

class DashBoard extends React.Component {

  employees =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    })
  }

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
