import React from 'react'
import './dashboard.scss'
import axios from 'axios';
import employess from'./media/employees.png';
import calendar from'./media/calendar.png';
import nomina from'./media/nomina.png';

const url = 'https://localhost:44338/api/User';

class DashBoard extends React.Component {

  state = { data: [] }

  employees =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    })
  }

  componentDidMount(){
    this.employees();
  }

  render(){
    return (
      <div className='dash'>
        <h1>Dashboard</h1>
        <div className='cards'>

          <div className='card'>
          <img src={employess} className="card-img-top" alt="..."/>
            <div className='text'>
              <h1>{this.state.data.length}</h1> {/*numero representativo */}
              <h3>Empleados</h3>
            </div>
          </div>

          <div className="card">
            <img src={nomina} className="card-img-top" alt="..."/>
            <div className='text'>
              <h1>0</h1> {/*numero representativo */}
              <h3>Vacaciones</h3>
            </div>
          </div>

          <div className='card'>
            <img src={calendar} className="card-img-top" alt="..."/>
            <div className='text'>
              <h1>0</h1>
              <h3>Nomina</h3>
            </div>
          </div>
        </div>
        <br/>
        <h3>Ultimos Empleados</h3>
        <ul className='employee'>
        {
          this.state.data.map(employee => {
            return(
              <li>
                <h3>{employee.name} {employee.lastName}</h3>
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
