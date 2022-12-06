import React from 'react';
import './empleados.scss';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const url= 'https://localhost:7116/api/User';

class empleados extends React.Component{

  state = {
    abierto: false,
    data:[],
    form:{ 
      Cedula: '',
      Nombre: '',
      Apellido: '',
      Fecha: '', 
      Cargo: '',
      Departamento: '', 
      HorarioTrabajo: '',
      Telefono: '', 
      correo: ''
    },
    message: ''
  }

  //Peticion Get
  peticionGet = () => {
    axios.get(url).then (respon=> {
      this.setState({data: respon.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }

  componentDidMount(){
    this.peticionGet();
  }

  //Metodo Post

  peticionPost = async() =>{
    delete this.state.form.id 
   await axios.post(url, this.state.form).then(respon=>{
      this.abrirModal();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
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

  //Modal
  
  abrirModal = () =>{
    this.setState({abierto: !this.state.abierto});
  }

  render(){
    const {form} = this.state;

    return(
      <>
      <div className="Modal">
        <Modal isOpen={this.state.abierto}>
          <ModalHeader>
            <h4>Formulario</h4>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                <Label for='Cedula'>Cedula</Label>
                <Input type='text' name='Cedula' id='Cedula' onChange={this.handleChange} value={form.Cedula}></Input>

                <Label for='Nombre'>Nombre</Label>
                <Input type='text' name='Nombre' id='Nombre' onChange={this.handleChange} value={form.Nombre}></Input>

                <Label for='Apellidos'>Apellidos</Label>
                <Input type='text' name='Apellido' id='Apellido' onChange={this.handleChange} value={form.Apellido}></Input>

                <Label for='Fecha'>Fecha de Nacimiento</Label>
                <Input type='text' name='Fecha' id='Fecha' onChange={this.handleChange} value={form.Fecha}></Input>

                <Label for='Cargo'>Cargo</Label>
                <Input type='calendar' name='Cargo' id='Cargo' onChange={this.handleChange} value={form.Cargo}></Input>

                <Label for='Departamento'>Departamento</Label>
                <Input type='text' name='Departamento' id='Departamento' onChange={this.handleChange} value={form.Departamento}></Input>

                <Label for='HorarioTrabajo'>Horario de Trabajo</Label>
                <Input type='text' name='HorarioTrabajo' id='HorarioTrabajo' onChange={this.handleChange} value={form.HorarioTrabajo}></Input>

                <Label for='Telefono'>Telefono</Label>
                <Input type='text' name='Telefono' id='Telefono' onChange={this.handleChange} value={form.Telefono}></Input>

                <Label for='Correo'>Correo Electronico</Label>
                <Input type='text' name='correo' id='Correo' onChange={this.handleChange} value={form.correo}></Input>
              </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={()=> this.peticionPost()}>Agregar</Button>
            <Button color='secondary' onClick={this.abrirModal}>Cerrar</Button>
          </ModalFooter>

        </Modal>
      </div>

      <div className='empleadostb'>

        <div className='header'>
          <h1>Empleados</h1>
          <div className='Principal'>
            <div className='Secundario'>
              <input type="text" className="form-control" placeholder='filtrar...' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              <Button color='success' onClick={this.abrirModal}>Nuevo</Button>
            </div>
          </div>
        </div>

        <table className="table table-dark td" id='td'>
          <thead>
            <tr>
              <th className="table-active" scope="col">ID</th>
              <th scope="col">Cedula</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Cargo</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Cargo</th>
              <th scope="col">Departamento</th>
              <th scope="col">Numero telefonico</th> 
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Vacaciones</th>
              <th scope="col">Sueldo</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map(empleados=> {
              return(
                <tr>
                  <td>{empleados.id}</td>
                  <td>{empleados.name}</td>
                  <td>{empleados.lastname}</td>
                  <td>{empleados.email}</td>
                  <td>{empleados.role}</td>
                  <td>{empleados.password}</td>
                  <td>{empleados.charge}</td>
                  <td>{empleados.departament}</td>
                  <td>{empleados.phoneNumber}</td>
                  <td>{empleados.birthDate}</td>
                  <td>{empleados.userVacations}</td>
                  <td>{empleados.payroll}</td>
                  <td><Button color='success'>Editar</Button></td>
                  <td><Button color='danger'>Editar</Button></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
      
      </>
    )
  }
}

export default empleados;
