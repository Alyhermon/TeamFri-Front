import React from 'react'
import './dashboard.scss'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

import employess from'./media/employees.png';
import calendar from'./media/calendar.png';
import nomina from'./media/nomina.png';

const url = 'https://localhost:44338/api/User';
const nominaUrl = 'https://localhost:44338/api/Payroll';
const vacacionesUrl = 'https://localhost:44338/api/Vacation';

class DashBoard extends React.Component {

  state = { data: [], data1: [], data2: []}

  employees =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    })
  }

  vacations =()=> {
    axios.get(vacacionesUrl).then(respon=> {
      this.setState({data1: respon.data});
    })
  }

  nominas =()=> {
    axios.get(nominaUrl).then(respon=> {
      this.setState({data2: respon.data});
    })
  }

  message = (title,message,icon) => {
    Swal.fire({
      icon: icon,
      position: 'top',
      toast: 'true',
      timer:'3000',
      title: title,
      text: message,
      showConfirmButton: false,
    });
  }

  componentDidMount(){
    this.employees();
    this.vacations();
    this.nominas();
  }

  render(){
    return (
      <div className='dash'>
        <h1>Dashboard</h1>
        <div className='cards'>

          <NavLink to='/empleados' className='link'>
            <div className='card'>
            <img src={employess} className="card-img-top" alt="..."/>
              <div className='text'>
                <h1>{this.state.data.length}</h1> {/*numero representativo */}
                <h3>Empleados</h3>
              </div>
            </div>
          </NavLink>
          <NavLink to='/vacaciones' className='link'>
          <div className="card">
            <img src={calendar} className="card-img-top" alt="..."/>
            <div className='text'>
              <h1>{this.state.data1.length}</h1> {/*numero representativo */}
              <h3>Vacaciones</h3>
            </div>
          </div>
          </NavLink>
          {/* <NavLink to='/nominas' className='link'> */}
          <div className='card' onClick={() => this.message('Apartado no disponible','Actualmente nominas no se encuentra en funcionamiento para el publico','error')}>
            <img src={nomina} className="card-img-top" alt="..."/>
            <div className='text'>
              <h1>{this.state.data2.length}</h1>
              <h3>En nomina</h3>
            </div>
          </div>
          {/* </NavLink> */}
        </div>
        <br/>
        <h3>Ultimos Empleados</h3>
        <ul className='employee'>
        {
          this.state.data.map(employee => {
            return(
              <li>
                <h4>{employee.name} {employee.lastName}</h4>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

export default DashBoard
