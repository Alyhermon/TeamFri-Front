import React from 'react';
import './empleados.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

// const url= 'https://localhost:7116/api/User';
const urlGet = 'https://localhost:44356/api/empleado/';
const urlPost = 'https://localhost:44356/api/empleado/';
const urlPut = 'https://localhost:44356/api/empleado?id=';
const urlDelete = ' https://localhost:44356/api/empleado?id=';

class empleados extends React.Component{

  state = {
    abrirModal: false,
    modalEliminar: false,
    data:[],
    form:{ 
      id: '',
      Cedula: '',
      Nombre: '',
      Apellido: '',
      Fecha: '', 
      Cargo: '', 
      Departamento: '', 
      HorarioTrabajo: '', 
      Telefono: '', 
      correo: '',
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
    axios.put(urlPut+this.state.form.id, this.state.form).then(response=>{
      this.abrirModal();
      this.peticionGet();
    })
  }

  //Metodo Eliminar
  
  peticionDelete=()=>{
    axios.delete(urlDelete  + this.state.form.id).then(response=>{
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
          id: empleados.Id,
          Cedula: empleados.Cedula,
          Nombre: empleados.Nombre,
          Apellido: empleados.Apellido,
          Fecha: empleados.fechaNacimiento, 
          Cargo: empleados.Cargo, 
          Departamento: empleados.Departamento, 
          HorarioTrabajo: empleados.HorarioTrabajo, 
          Telefono: empleados.Telefono, 
          correo: empleados.correo
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
      <input type="text" className="form-control" placeholder='filtrar...' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      <button className='btn btn-success' onClick={() => { 
        this.setState({ form: null, tipoModal: "insertar" });
        this.abrirModal();
        }}
        >Nuevo</button>
        <br>
        </br>
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
      <th scope="col">Fecha de Nacimiento</th>
      <th scope="col">Departamento</th>
      <th scope="col">Horario de Trabajo</th>
      <th scope="col">Telefono</th> 
      <th scope="col">Correo</th>
      <th scope="col">Opciones</th>

    </tr>
  </thead>

  <tbody>
    {this.state.data.map((empleados)=> {
      return(
        <tr>
          <td>{empleados.Id}</td>
          <td>{empleados.Cedula}</td>
          <td>{empleados.Nombre}</td>
          <td>{empleados.Apellido}</td>
          <td>{empleados.Cargo}</td>
          <td>{empleados.fechaNacimiento}</td>
          <td>{empleados.Departamento}</td>
          <td>{empleados.HorarioTrabajo}</td>
          <td>{empleados.Telefono}</td>
          <td>{empleados.correo}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.seleccionarProducto(empleados);
                this.abrirModal();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => {
                this.seleccionarProducto(empleados);
                this.setState({ modalEliminar: true });
              }}
            >
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
              <Input className="form-control" type="text" name="Id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>

                <Label for='Cedula'>Cedula</Label>
                <Input type='text' name='Cedula'   onChange={this.handleChange} value={form ?  form.Cedula: ''}></Input>

                <Label for='Nombre'>Nombre</Label>
                <Input type='text' name='Nombre' id='Nombre' onChange={this.handleChange} value={form ?  form.Nombre: ''}></Input>

                <Label for='Apellidos'>Apellidos</Label>
                <Input type='text' name='Apellido' id='Apellido' onChange={this.handleChange} value={form ? form.Apellido: ''}></Input>

                <Label for='Fecha'>Fecha de Nacimiento</Label>
                <Input type='text' name='Fecha' id='Fecha' onChange={this.handleChange} value={form ?  form.fechaNacimiento: ''}></Input>

                <Label for='Cargo'>Cargo</Label>
                <Input type='text' name='Cargo' id='Cargo' onChange={this.handleChange} value={form ?  form.Cargo: ''}></Input>

                <Label for='Departamento'>Departamento</Label>
                <Input type='text' name='Departamento' id='Departamento' onChange={this.handleChange} value={form ?  form.Departamento: ''}></Input>

                <Label for='HorarioTrabajo'>Horario de Trabajo</Label>
                <Input type='text' name='HorarioTrabajo' id='HorarioTrabajo' onChange={this.handleChange} value={form ?  form.HorarioTrabajo: ''}></Input>

                <Label for='Telefono'>Telefono</Label>
                <Input type='text' name='Telefono' id='Telefono' onChange={this.handleChange} value={form ?  form.Telefono: ''}></Input>

                <Label for='Correo'>Correo Electronico</Label>
                <Input type='text' name='correo' id='Correo' onChange={this.handleChange} value={form ?  form.correo: ''}></Input>
              </FormGroup>
          </ModalBody>

        <ModalFooter>
          {this.state.tipoModal === "insertar" ? (
            <button
              className="btn btn-success"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPut()}
            >
              Actualizar
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => this.abrirModal()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal> 

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el empleado? {form && form.Nombre}
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger" onClick={()=> this.peticionDelete()}
          >
            Sí
          </Button>
          <Button
            className="btn btn-secundary"
            onClick={() => this.setState({ modalEliminar: false })}
          >
            No
          </Button  >

          
        </ModalFooter>
        </Modal>
        </div>
      
      </>
    )
  }
}

export default empleados;
