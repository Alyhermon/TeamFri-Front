import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExclamation, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const url = 'http://localhost:3002/empleados';

class Formulario extends React.Component{
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

      render(){

        const {form} = this.state;

        return(
            <>

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
                    <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                    ) : (
                    <button className="btn btn-primary" onClick={() => this.peticionPut()}>Actualizar</button>
                    )}
                    <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
                </ModalFooter>
            </Modal> 

            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>¿Estás seguro que deseas eliminar el empleado? {form && form.Nombre}</ModalBody>

                <ModalFooter>
                    <Button className="btn btn-danger" onClick={()=> this.peticionDelete()}>Sí</Button>
                    <Button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</Button  >
                </ModalFooter>
            </Modal>
            </div>

            <button className='btn btn-success' onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.abrirModal();}}>Nuevo</button>

            </>
        )
      }
}

export default Formulario