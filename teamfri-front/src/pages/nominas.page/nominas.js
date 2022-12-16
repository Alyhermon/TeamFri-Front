import React from 'react'
import './nominas.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import Search from '../../components/search/search';

const url = 'https://localhost:44338/api/Payroll';
const url1 = 'https://localhost:44338/api/Payroll?id=';
const urldelete = 'https://localhost:44338/api/Payroll/';

class Nominas extends React.Component{

  state = {
    add: false,
    delete: false,
    data:[],
    form:{ 
        id: '',
        userId: '',
        date: '',
        hours: '',
        rate: '',
        total: ''
      }
    }

    openModal = () => {
      this.setState({ add: !this.state.add });
    }

  //metodos AJAX
  Get =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    }).catch(error =>{
      this.message('Error al traer los datos',error.message,'error');
    })
  }

  Post = async () => {
    delete this.state.form.Id;
    await axios.post(url, this.state.form).then(response => {
        this.openModal();
        this.Get();
        this.message('Empleado agregado a la nomina satisfactoriamente', '', 'success');
    }).catch(error => {
        console.log(error.message);
        this.message('Error al agregar a nominas', error.message, 'error');
    })
  }

  //editar
  Put = () => {
      axios.put(url1 + this.state.form.id, this.state.form).then(response => {
          this.openModal();
          this.Get();
          this.message('Cambios registrados exitosamente', '', 'success');
      }).catch(error => {
          this.message('Error al cambiar los datos', error.message, 'error');
      })
  }

  //Eliminar
  Delete = () => {
      axios.delete(urldelete + this.state.form.id).then(response => {
          this.setState({ deleteModal: false });
          this.Get();
          this.message('Campo eliminado exitosamente', '', 'success');
      }).catch(error => {
          this.message('Error al eliminar el campo', error.message, 'error');
      })
  }

  //---------------------------------------------------------------------

  select = (nomina) => {
    this.setState({
        modalType: 'update',
        form: {
            id: nomina.id,
            userId: nomina.userId,
            date: nomina.date,
            hours: nomina.hours,
            rate: nomina.rate,
            total: nomina.total,
            }
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

  handleChange = async e => {
    e.persist();
    await this.setState({
        form: {
            ...this.state.form,
            [e.target.userId]: e.target.value
        }
    });
  }

  //filtrador
  handleSearch = (search) => {
    if (search === '') {
      this.Get();
    } else {
        let results = this.state.data.filter(element => {
            if (element.userId.toString().toLowerCase().includes(search.toLowerCase())) 
            {
                return element;
            }
        });
        this.setState({ data: results });
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
                <button className='btn btn-success' onClick={() => { this.setState({ form: null, modalType: "add" }); this.openModal(); }}>Nuevo</button>
            </div>
        </div>
        <table id="PayrollTable" className="table table-striped table-hover shadow">
          <thead className='table-primary'>
            <tr className="text-dark">
              <th scope="col">Empleado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Horas trabajadas</th>
              <th scope="col">Salario total</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody id="Employees-table">
          {this.state.data.map(nomina => {
            return(
              <tr>
                <td>{nomina.userId}</td>
                <td>{nomina.date}</td>
                <td>{nomina.hours}</td>
                <td>{nomina.total}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => { this.select(nomina); this.openModal(); }}>
                    <i className="fi fi-rr-pencil"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => { this.select(nomina); this.setState({ deleteModal: true }); }}>
                    <i className="fi fi-rr-trash"></i>
                  </button>
                  <button className="excla btn btn-primary" onClick={() => { this.select(nomina); this.setState({ detailsModal: true }); }}>
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

        <div className='modals'>
          <Modal isOpen={this.state.add}>

            <ModalHeader>
                {this.state.modalType === "add" ? (
                    <h3>Agregar a la nomina</h3>
                ) : (
                    <h3>Editando campo</h3>
                )}
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for='UserId'>Id del empleado</Label>
                <Input type='text' required name='userId' id='UserId' value={form ? form.userId : ''}></Input>

                <Label for='date'>Fecha</Label>
                <Input type='date' name='date' id='date' value={form ? form.date : ''}></Input>

                <Label for='hours'>Horas</Label>
                <Input type='text' name='hours' id='hours' value={form ? form.hours : ''}></Input>

                <Label for='rate'>Taza</Label>
                <Input type='text' name='rate' id='rate' value={form ? form.rate : ''}></Input>

                <Label for='total'>Total</Label>
                <Input type='text' name='total' id='total' value={form ? form.total : ''}></Input>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              {this.state.modalType === "add" ? (
                <button className="btn btn-primary" onClick={() => this.Post()}>Agregar</button>
              ) : (
                <button className="btn btn-primary" onClick={() => this.Put()}>Guardar cambios</button>
              )}
              <button className="btn btn-danger" onClick={() => this.openModal()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.detailsModal}>
            <ModalHeader>
              <div id='detalles'>
                <h3>Detalles</h3>
              </div>
            </ModalHeader>

            <ModalBody className='details'>
              <div className='atribute'>
                <h4 className='titleNAC' id='Emp'>Id del empleado : </h4><h4 className='p'>{form && form.userId}</h4>
              </div>
              <div className='atribute'>
                <h4 className='titleNA' id='Cod'>Fecha : </h4><h4 className='p'>{form && form.date}</h4>
              </div>
              <div className='atribute'>
                <h4 className='titleNA' id='Fi'>Horas : </h4><h4 className='p'>{form && form.hours}</h4>
              </div>
              <div className='atribute'>
                <h4 className='titlecumple' id='Fr'>Taza : </h4><h4 className='p'>{form && form.rate}</h4>
              </div>
              <div className='atribute'>
                <h4 className='titlecumple' id='Fr'>Total : </h4><h4 className='p'>{form && form.total}</h4>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button className="btn" onClick={() => this.setState({ detailsModal: false })}>Aceptar</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.deleteModal}>
            <ModalBody>
              <p>¿Desea eliminar este campo?</p>
            </ModalBody>

            <ModalFooter>
              <Button className="btn btn-danger" onClick={() => this.Delete()}>Si</Button>
              <Button className="btn btn-secundary" onClick={() => this.setState({ deleteModal: false })}>No</Button  >
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Nominas
