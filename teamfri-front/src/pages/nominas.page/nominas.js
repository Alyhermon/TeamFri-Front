import React from 'react'
import './nominas.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import Search from '../../components/search/search';

const url = 'https://localhost:44338/api/Payroll';

class Nominas extends React.Component{

  state = {
    add: false,
    delete: false,
    data:[],
    form:{ 
        userId: '',
        date: '',
        hours: '',
        rate: '',
        total: ''
      }
    }

  //Peticion Get
  Get =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    }).catch(error =>{
      this.message('Error al traer los datos',error.message,'error');
    })
  }

  //alertas
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

  //filtrador
  handleSearch = (search) => {
    if(search === ''){
      this.peticionGet();
    } else {
      let results = this.state.data.filter((element) => {
        if (element.name.toString().toLowerCase().includes(search.toLowerCase())
        || (element.lastName.toString().toLowerCase().includes(search.toLowerCase()))){
          return element;
        }
      });
      this.setState({ data: results});
    }
  }

  componentDidMount(){
    this.Get();
  }

  render(){
    const {form} = this.state;

    return (
      <div className='nominastb'>
        <div className='header'>
            <h1>Nominas</h1>
            <div className='Principal'>
                <Search handleSearch={this.handleSearch} />
            </div>
        </div>
        <table id="PayrollTable" className="table table-striped table-hover shadow">
          <thead className='table-primary'>
            <tr className="text-dark">
              <th scope="col">ID</th>
              <th scope="col">Empleado</th>
              <th scope="col">Salario por Hora</th>
              <th scope="col">Horas trabajadas</th>
              <th scope="col">Salario total</th>
            </tr>
          </thead>
          <tbody id="Employees-table">
            {console.log(this.state.data)}
          {this.state.data.map(field => {
            return(
              <tr>
                <td>{field.userId}</td>
                <td>{field.date}</td>
                <td>{field.hours}</td>
                <td>{field.rate}</td>
                <td>{field.total}</td>
                <td>
                  <button className="btn btn-danger">
                    <i className="fi fi-rr-trash"></i>
                  </button>
                  <button className="excla btn btn-primary">
                    <i className="fi fi-rr-info"></i>
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
          <tfoot id="summery" className="fw-bold text-dark">
            <tr>
              <th scope="row">Sum</th>
              <td className="text-success">Max: <span id="Max-wage">$13.55</span></td>
              <td className="text-danger">Min: <span id="Min-wage">$13.55</span></td>
              <td className="text-primary"><span></span></td>
              <td><span id="Total-WH"></span></td>
              <td><span id="Total-pay"> </span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Nominas
