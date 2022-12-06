import React from 'react';
import './empleados.scss';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const url= 'https://localhost:44356/api/empleado/';

class empleados extends React.Component{

  state={
    modalInsertar: false,
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
    }
  }

  //Peticion Get
  peticionGet=()=>{
    axios.get(url).then(respon=> {
      this.setState({data: respon.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }



  //Metodo Post
  peticionPost=async()=>{
   await axios.post(url, this.state.form).then(respon=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }


  handleChange=async e => {
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
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  componentDidMount(){
    this.peticionGet();
  }

  render(){
    const {form} = this.state;

    return(
      <>

      <div className  ="Modal">
      <Modal isOpen={this.state.modalInsertar} >
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
            <Button color='secondary' onClick={()=> this.modalInsertar()}>Cerrar</Button>
          </ModalFooter>

      </Modal>




      
      </div>

      <div className='empleadostb'>
        <div className='header'>
          <h1>Empleados</h1>
          <div className='Principal'>
            <div className='Secundario'>
              <Button color='success' onClick={()=> this.modalInsertar()}>Nuevo</Button>
            </div>
          </div>
        </div>
        <table className="table table-dark td" id='td'>
          <thead>
            <tr>
              <th className="table-active" scope="col">ID</th>
              <th scope="col">Cedula</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellido</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Cargo</th>
              <th scope="col">Departamento</th>
              <th scope="col">Horario de Trabajo</th>
              <th scope="col">Telefono</th>
              <th scope="col">Correo Electronico</th> 
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {this.state.data.map(empleados=> {
              return(
                <tr>
                <td>{empleados.Id}</td>
                <td>{empleados.Cedula}</td>
                <td>{empleados.Nombre}</td>
                <td>{empleados.Apellido}</td>
                <td>{empleados.fechaNacimiento}</td>
                <td>{empleados.Cargo}</td>
                <td>{empleados.Departamento}</td>
                <td>{empleados.HorarioTrabajo}</td>
                <td>{empleados.Telefono}</td>
                <td>{empleados.correo}</td>
                <td>
                  <Button color='success'>Editar</Button>
                  </td>
                  <td>
                  <Button color='danger'>Editar</Button>
                </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      </>
    )
  }
}

export default empleados;
