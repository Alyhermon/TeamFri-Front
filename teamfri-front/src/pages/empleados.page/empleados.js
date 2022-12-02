import React from 'react';
import './empleados.scss';

const Empleados = () => {
  return (
    <div className='empleadostb'>
      <h1>Empleados</h1>
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
  )
}

export default Empleados
