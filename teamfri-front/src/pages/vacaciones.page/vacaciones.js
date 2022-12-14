import React from 'react'
import './vacaciones.scss';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader } from 'reactstrap';

class Vacaciones extends React.Component {

  render() {
    return (
      <div className='vacacionestb'>
        <div class="container mb-3">
          <h1>Vacaciones</h1>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Empleado</th>
                <th scope="col">Codigo</th>
                <th scope="col">Fecha inicio</th>
                <th scope="col">Fecha retorno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manuel</td>
                <td>251984</td>
                <td>15/05/2023</td>
                <td>15/06/2023</td>
                <td>
                  <button className="btn btn-primary">
                    <i className="fi fi-rr-pencil"></i>
                  </button>
                  <button className="btn btn-danger">
                    <i className="fi fi-rr-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Manuel</td>
                <td>251984</td>
                <td>15/05/2023</td>
                <td>15/06/2023</td>
                <td>
                  <button className="btn btn-primary">
                    <i className="fi fi-rr-pencil"></i>
                  </button>
                  <button className="btn btn-danger">
                    <i className="fi fi-rr-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Manuel</td>
                <td>251984</td>
                <td>15/05/2023</td>
                <td>15/06/2023</td>
                <td>
                  <button className="btn btn-primary">
                    <i className="fi fi-rr-pencil"></i>
                  </button>
                  <button className="btn btn-danger">
                    <i className="fi fi-rr-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table></div>


        <div className="Modal" class="w-50 container">
          <Modal>
            <ModalHeader>
              <div id='detalles'>
                <h3>Agregar vacaciones</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for='Empleado'>Empleado</Label>
                <Input type='text' required name='empleado'></Input>

                <Label for='Codigo'>Codigo</Label>
                <Input type='text' name='codigo' id='codigo'></Input>

                <Label for='Finicio'>Fecha de Inicio</Label>
                <Input type='date' name='fechaInicio'></Input>

                <Label for='Fretorno'>Fecha de retorno</Label>
                <Input type='date' name='fechaRetorno'></Input>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-primary" >Agregar</button>
              <button className="btn btn-primary">Guardar cambios</button>
              <button className="btn btn-danger">Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>


    )
  }
}

export default Vacaciones
