import React from 'react';
import './empleados.scss';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class empleados extends React.Component{

  state={
    abierto: false,
  }
  
  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }

  render(){

    return(
      <>

      <div className  ="Modal">
      <Modal isOpen={this.state.abierto}>
        <ModalHeader>
          <h4>Formulario</h4>
        </ModalHeader>

          <ModalBody>
            <FormGroup>
            <Label for='Cedula'>Cedula</Label>
              <Input type='text' id='Cedula'></Input>

              <Label for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre'></Input>

              <Label for='Apellidos'>Apellidos</Label>
              <Input type='text' id='Apellidos'></Input>

              <Label for='Fecha'>Fecha de Nacimiento</Label>
              <Input type='text' id='Fecha'></Input>

              <Label for='Cargo'>Cargo</Label>
              <Input type='calendar' id='Cargo'></Input>

              <Label for='Departamento'>Departamento</Label>
              <Input type='text' id='Departamento'></Input>

              <Label for='HorarioTrabajo'>Horario de Trabajo</Label>
              <Input type='text' id='HorarioTrabajo'></Input>

              <Label for='Telefono'>Telefono</Label>
              <Input type='text' id='Telefono'></Input>

              <Label for='Correo'>Correo Electronico</Label>
              <Input type='text' id='Correo'></Input>


            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary'>Agregar</Button>
            <Button color='secondary' onClick={this.abrirModal}>Cerrar</Button>
          </ModalFooter>

      </Modal>
      </div>

      <div className='empleadostb'>
        <div className='header'>
          <h1>Empleados</h1>
          <div className='Principal'>
            <div className='Secundario'>
              <Button color='success' onClick={this.abrirModal}>Nuevo</Button>
            </div>
          </div>
        </div>
        <table className="table table-dark td" id='td'>
          <thead>
            <tr>
              <th className="table-active" scope="col">ID</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellido</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Cargo</th>
              <th scope="col">Departamento</th>
              <th scope="col">Horario de Trabajo</th>
              <th scope="col">Telefono</th>
              <th scope="col">Correo Electronico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="table-active">1</th>
              <td>Juan</td>
              <td>Perez</td>
              <td>2/06/2000</td>
              <td>Full Stack</td>
              <td>Informatica</td>
              <td>8-4pm</td>
              <td>829-985-9997</td>
              <td>Juancito@gmail.com</td>
              </tr>
          </tbody>
        </table>
      </div>

      </>
    )
  }
}

export default empleados;
