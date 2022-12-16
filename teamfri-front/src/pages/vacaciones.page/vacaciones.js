import React from 'react'
import './vacaciones.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader } from 'reactstrap';

import Search from '../../components/search/search';

const url = 'https://localhost:44338/api/Vacation';
const url2 = 'https://localhost:44338/api/User';
const urlPut = 'https://localhost:44338/api/Vacation?id='
const urlDelete = 'https://localhost:44338/api/Vacation/';

class Vacaciones extends React.Component {

    state = {
        abrirModal: false,
        modalEliminar: false,
        data: [],
        data2: [],
        form: {
            id: '',
            userId: '',
            startDate: '',
            endDate: '',
            reason: '',
        }
    }


    // Get

    Get = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            this.message('Error al traer los datos', error.message, 'error');
        })
    }

    Getempleados = () => {
        axios.get(url2).then(response => {
            this.setState({ data2: response.data });
        }).catch(error => {
            this.message('Error al traer los datos2', error.message, 'error');
        })
    }

    //Agregar

    Post = async () => {
        delete this.state.form.Id;
        await axios.post(url, this.state.form).then(response => {
            this.abrirModal();
            this.Get();
            this.message('Vacaciones registradas exitosamente', '', 'success');
        }).catch(error => {
            console.log(error.message);
            this.message('Error al agregar vacaciones', error.message, 'error');
        })
    }

    //Eliminar

    Put = () => {
        axios.put(urlPut + this.state.form.id, this.state.form).then(response => {
            this.abrirModal();
            this.Get();
            this.message('Cambios registrados exitosamente', '', 'success');
        }).catch(error => {
            this.message('Error al cambiar los datos', error.message, 'error');
        })
    }

    Delete = () => {
        axios.delete(urlDelete + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.Get();
            this.message('Campo eliminado exitosamente', '', 'success');
        }).catch(error => {
            this.message('Error al eliminar usuario', error.message, 'error');
        })
    }

    //Modal

    abrirModal = () => {
        this.setState({ abrirModal: !this.state.abrirModal });
    }

    seleccionar = (vacaciones) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: vacaciones.id,
                userId: vacaciones.userId,
                startDate: vacaciones.startDate,
                endDate: vacaciones.endDate,
                reason: vacaciones.reason,
                }
            })
    }

    message = (title, message, icon) => {
        Swal.fire({
            icon: icon,
            position: 'top',
            toast: 'true',
            timer: '3000',
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
                [e.target.name]: e.target.value
            }
        });
    }

    handleSearch = (search) => {
        if (search === '') {
            this.Get();
        } else {
            let results = this.state.data.filter((element) => {
                if (element.userId.toString().toLowerCase().includes(search.toLowerCase())
                    ) {
                    return element;
                }
            });
            this.setState({ data: results });
        }
    }

    buscar(empleados, id) {

        if (id === empleados.id) {
            return empleados.name;
        } else { };

}

    componentDidMount() {
        this.Get();
    }



    /**********************************HTML************************************************* */
    render() {
        const { form } = this.state;

        return (
          <div className='vacacionestb'>

              <div className='header'>
                <h1>Vacaciones</h1>
                <div className='Principal'>
                        <Search handleSearch={this.handleSearch} />
                        <button className='btn btn-success' onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.abrirModal(); }}>Nuevo</button>
                </div>
              </div>
          
              <table className="table table-light table-striped tb">
                <thead className='table-primary'>
                  <tr>
                    <th scope="col">Id de empleado</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha retorno</th>
                    <th scope="col">Razon</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                        {this.state.data.map(vacaciones => {
                            return (
                                <tr>
                                    <td>{vacaciones.userId}</td>
                                    <td>{vacaciones.startDate}</td>
                                    <td>{vacaciones.endDate}</td>
                                    <td>{vacaciones.reason}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionar(vacaciones); this.abrirModal(); }}>
                                            <i className="fi fi-rr-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => { this.seleccionar(vacaciones); this.setState({ modalEliminar: true }); }}>
                                            <i className="fi fi-rr-trash"></i>
                                        </button>
                                        <button className="excla btn btn-primary" onClick={() => { this.seleccionar(vacaciones); this.setState({ modalDetalle: true }); }}>
                                            <i className="fi fi-rr-info"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
              </table>
      
            <div className="Modal w-50 container">
                <Modal isOpen={this.state.abrirModal}>
                    <ModalHeader>
                        <div id='detalles'>
                            {this.state.tipoModal === "insertar" ? (
                                <h3>Agregar vacaciones</h3>
                            ) : (
                                <h3>Editando a {form && form.name}</h3>
                            )}
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for='UserId'>Id</Label>
                            <Input type='text' required name='userId' onChange={this.handleChange} value={form ? form.userId : ''}></Input>

                            <Label for='Inicio'>Fecha de Inicio</Label>
                            <Input type='date' name='startDate' id='startDate' onChange={this.handleChange} value={form ? form.startDate : ''}></Input>

                            <Label for='Retorno'>Fecha de Retorno</Label>
                            <Input type='date' name='endDate' onChange={this.handleChange} value={form ? form.endDate : ''}></Input>

                            <Label for='Razon'>Razon</Label>
                            <Input type='text' name='reason' onChange={this.handleChange} value={form ? form.reason : ''}></Input>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === "insertar" ? (
                            <button className="btn btn-primary" onClick={() => this.Post()}>Agregar</button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => this.Put()}>Guardar cambios</button>
                        )}
                        <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
                    {/* modal de detalles */}
                <Modal isOpen={this.state.modalDetalle}>
                    <ModalHeader>
                        <div id='detalles'>
                            <h3>Detalles de {form && form.vacaciones}</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody className='details'>
                        <div className='atribute'>
                            <h4 className='titleNAC' id='Emp'>Empleado : </h4><h4 className='p'>{form && form.userId}</h4>
                        </div>
                        <div className='atribute'>
                            <h4 className='titleNA' id='Cod'>Codigo : </h4><h4 className='p'>{form && form.startDate}</h4>
                        </div>
                        <div className='atribute'>
                            <h4 className='titleNA' id='Fi'>Fecha de inicio : </h4><h4 className='p'>{form && form.endDate}</h4>
                        </div>
                        <div className='atribute'>
                            <h4 className='titlecumple' id='Fr'>Fecha de retorno : </h4><h4 className='p'>{form && form.reason}</h4>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button className="btn" onClick={() => this.setState({ modalDetalle: false })}>Aceptar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        <p>¿Desea eliminar este campo?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button className="btn btn-danger" onClick={() => this.Delete()}>Si</Button>
                        <Button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</Button  >
                    </ModalFooter>
                </Modal>

            </div>
          </div>
        )
  }
}

export default Vacaciones
