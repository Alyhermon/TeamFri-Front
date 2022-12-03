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

      <Modal isOpen={this.state.abierto}>
        <ModalHeader>
          <h4>Formulario</h4>
        </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre'></Input>

              <Label for='Apellido'>Apellido</Label>
              <Input type='text' id='Apellido'></Input>

              <Label for='Correo Electronico'>Correo Electronico</Label>
              <Input type='text' id='Correo Electronico'></Input>

              <Label for='Contraseña'>Contraseña</Label>
              <Input type='text' id='Contraseña'></Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary'>Iniciar sesion</Button>
            <Button color='secondary' onClick={this.abrirModal}>Cerrar</Button>
          </ModalFooter>

      </Modal>

      <div className='empleadostb'>
        <div className='Principal'>
          <div className='Secundario'>
            <Button color='success' onClick={this.abrirModal}>Nuevo</Button>
          </div>
        </div>
        <table className="table table-dark td" id='td'>
          <thead>
            <tr>
              <th className="table-active" scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Cargo</th>
              <th scope="col">Sueldo</th>
              <th scope="col">Vacaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="table-active">#</th>
              <td>Juan</td>
              <td>Perez</td>
              <td>Desarrollador</td>
              <td>80.000.00</td>
              <td>idk</td>
            </tr>
          </tbody>
        </table>
      </div>

      </>
    )
  }
}

export default empleados;
