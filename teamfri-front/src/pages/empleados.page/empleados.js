import React from 'react';
import './empleados.scss';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExclamation, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import Search from '../../components/search/search';

const url = 'https://localhost:44338/api/User';
const urlPut = 'https://localhost:44338/api/User?id='
const urlDelete = 'https://localhost:44338/api/User/';

class empleados extends React.Component{

  state = {
    abrirModal: false,
    modalEliminar: false,
    data:[],
    form:{ 
      id: '',
      identification: '',
      name: '',
      lastName: '',
      birthDate: '', 
      charge: '', 
      department: '', 
      phoneNumber: '', 
      email: '',
      tipoModal: ''
    }
  }

  //Peticion Get
  peticionGet =()=> {
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    })
  }

  //Metodo Agregar
  peticionPost = async() =>{
    delete this.state.form.Id;
    await axios.post(url, this.state.form).then(Response=>{
      this.abrirModal();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  //Metodo Eliminar
  peticionPut=()=>{
    axios.put(urlPut+this.state.form.id, this.state.form).then(response=>{
      this.abrirModal();
      this.peticionGet();
    })
  }

  //Metodo Eliminar
  peticionDelete=()=>{
    axios.delete(urlDelete + this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

    //Modal
  abrirModal = () =>{
      this.setState({abrirModal: !this.state.abrirModal});
    }

  seleccionarProducto=(empleados)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          id: empleados.id,
          identification: empleados.identification,
          name: empleados.name,
          lastName: empleados.lastName,
          birthDate: empleados.birthDate, 
          charge: empleados.charge, 
          department: empleados.department,
          phoneNumber: empleados.phoneNumber, 
          email: empleados.email
        }
      })
    }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSearch = (search) => {
    if(search == ''){
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
    this.peticionGet();
  }

  /**********************************HTML************************************************* */

  render(){
    const {form} = this.state;

    return(
      <>
      <div className='empleadostb'>

      <div className='header'>
        <h1>Empleados</h1>
        <div className='Principal'>
          <div className='Secundario'>
            <Search handleSearch={this.handleSearch} />
            <button className='btn btn-success' onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.abrirModal();}}>Nuevo</button>
            <br/>
          </div>
        </div>
      </div>

      <table className="table table-dark tb">
        <thead>
          <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Cumpleaños</th>
            <th scope="col">Cargo</th>
            <th scope="col">Departamento</th>
            <th scope="col">Contacto</th> 
            <th scope="col">Correo</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>

        <tbody>
          {this.state.data.map(empleados => {
            return(
              <tr>
                <td>{empleados.identification}</td>
                <td>{empleados.name}</td>
                <td>{empleados.lastName}</td>
                <td>{empleados.birthDate}</td>
                <td>{empleados.charge}</td>
                <td>{empleados.department}</td>
                <td>{empleados.phoneNumber}</td>
                <td>{empleados.email}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => {this.seleccionarProducto(empleados); this.abrirModal();}}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-danger" onClick={() => {this.seleccionarProducto(empleados); this.setState({ modalEliminar: true });}}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button className="excla btn btn-secondary" onClick={() => {this.seleccionarProducto(empleados); this.setState({ modalDetalle: true });}}>
                    <FontAwesomeIcon icon={faExclamation} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
      
      <div className="Modal">
        <Modal isOpen={this.state.abrirModal}>

          <ModalBody>
              <FormGroup>
                <Label for='Cedula'>Cedula</Label>
                <Input type='text' name='identification'   onChange={this.handleChange} value={form ?  form.identification: ''}></Input>

                <Label for='Nombre'>Nombre</Label>
                <Input type='text' name='name' id='name' onChange={this.handleChange} value={form ?  form.name: ''}></Input>

                <Label for='Apellidos'>Apellidos</Label>
                <Input type='text' name='lastName' id='lastName' onChange={this.handleChange} value={form ? form.lastName: ''}></Input>

                <Label for='Fecha'>Fecha de Nacimiento</Label>
                <Input type='date' name='birthDate' id='birthDate' onChange={this.handleChange} value={form ?  form.birthDate: ''}></Input>

                <Label for='Cargo'>Cargo</Label>
                <Input type='text' name='charge' id='charge' onChange={this.handleChange} value={form ?  form.charge: ''}></Input>

                <Label for='Departamento'>Departamento</Label>
                <Input type='text' name='department' id='department' onChange={this.handleChange} value={form ?  form.department: ''}></Input>

                <Label for='Telefono'>Telefono</Label>
                <Input type='text' name='phoneNumber' id='phoneNumber' onChange={this.handleChange} value={form ?  form.phoneNumber: ''}></Input>

                <Label for='Correo'>Correo Electronico</Label>
                <Input type='text' name='email' id='email' onChange={this.handleChange} value={form ?  form.email: ''}></Input>
              </FormGroup>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>Actualizar</button>
            )}
            <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
          </ModalFooter>
        </Modal> 

        <Modal isOpen={this.state.modalDetalle}>
          <ModalHeader>
            <div id='detalles'>
            <h3>Detalles de los Empleados</h3>
            </div>
          </ModalHeader>
          
          <ModalBody className='details'>
          <div className='atribute'>
              <h4 className='titleNAC'  id='Ced'>Cedula : </h4><h4 className='p'>{form && form.identification}</h4>
            </div>
            <div className='atribute'>
              <h4 className='titleNA' id='Nom'>Nombres : </h4><h4 className='p'>{form && form.name}</h4>
            </div>
            <div className='atribute'>
              <h4 className='titleNA' id='Ape'>Apellidos : </h4><h4 className='p'>{form && form.lastName}</h4>
            </div>
            <div className='atribute'>
              <h4 className='titlecumple' id='Cumpl'>Cumpleaños : </h4><h4 className='p'>{form && form.birthDate}</h4>
            </div>
            <div className='atribute'>
              <h4 className='title5' id='Carg'>Cargo : </h4><h4 className='p'>{form && form.charge}</h4>
            </div>
            <div className='atribute'>
              <h4 className='titleDepa' id='Depa'>Departamento : </h4><h4 className='p'>{form && form.department}</h4>
            </div>
            <div className='atribute'>
              <h4 className='titleC' id='Conta'>Contacto : </h4><h4 className='p'>{form && form.phoneNumber}</h4>
            </div>
            <div className='atribute'>
              <h4 className='title5' id='Corr'>Correo : </h4><h4 className='p'>{form && form.email}</h4>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-sucess" onClick={()=> this.setState({modalDetalle: false})}> Ok</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            <p>Estás seguro que deseas eliminar el empleado cuyo nombre es:  <span><h6>{form && form.name}</h6></span></p>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-danger" onClick={()=> this.peticionDelete()}>Sí</Button>
            <Button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</Button  >
          </ModalFooter>
        </Modal>
      </div>
      
      </>
    )
  }
}

export default empleados;
