import React from 'react';
import './empleados.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Search from '../../components/search/search';

const urlGet = 'https://localhost:44338/api/User';
const urlPost = 'https://localhost:44338/api/User';
const urlPut = 'https://localhost:44338/api/User/id';
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
      lastname: '',
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
    axios.get(urlGet).then(respon=> {
      this.setState({data: respon.data});
    })
  }

  //Metodo Agregar
  peticionPost = async() =>{
    delete this.state.form.Id;
    await axios.post(urlPost, this.state.form).then(Response=>{
      this.abrirModal();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  //Metodo Eliminar
  peticionPut=()=>{
    axios.put(urlDelete+this.state.form.id, this.state.form).then(response=>{
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
          Cedula: empleados.identification,
          Nombre: empleados.name,
          Apellido: empleados.lastname,
          Fecha: empleados.birthDate, 
          Cargo: empleados.charge, 
          Departamento: empleados.departament,
          Telefono: empleados.phoneNumber, 
          correo: empleados.email
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
    console.log(this.state.form);
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
          <Search />
          <button className='btn btn-success' onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.abrirModal();}}>Nuevo</button>
          <br/>
        </div>
      </div>
    </div>

    <table className="table table-dark td" id='td'>
      <thead>
        <tr>
        <th scope="col">Id</th>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Cargo</th>
          <th scope="col">Cumpleaños</th>
          <th scope="col">Departamento</th>
          <th scope="col">Contacto</th> 
          <th scope="col">Correo</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>

      <tbody>
        {this.state.data.map((empleados)=> {
          return(
            <tr>
              <td>{empleados.id}</td>
              <td>{empleados.identification}</td>
              <td>{empleados.name}</td>
              <td>{empleados.lastname}</td>
              <td>{empleados.charge}</td>
              <td>{empleados.birthDate}</td>
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
              </td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
    </div>
      
      <div className="Modal">
        <Modal isOpen={this.state.abrirModal}>

          <ModalBody>
              <FormGroup>

                <Label htmlFor="id">ID</Label>
                <Input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>

                <Label for='Cedula'>Cedula</Label>
                <Input type='text' name='identification'   onChange={this.handleChange} value={form ?  form.identification: ''}></Input>

                <Label for='Nombre'>Nombre</Label>
                <Input type='text' name='name' id='name' onChange={this.handleChange} value={form ?  form.name: ''}></Input>

                <Label for='Apellidos'>Apellidos</Label>
                <Input type='text' name='lastname' id='lastname' onChange={this.handleChange} value={form ? form.lastname: ''}></Input>

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

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el empleado? {form && form.Nombre}
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
