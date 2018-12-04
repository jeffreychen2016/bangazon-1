import React, { Component } from 'react';
import { EmployeeDelete } from './EmployeeDelete';
import { EmployeeAdd } from './EmployeeAdd';

export class EmployeeGrid extends Component {

  printGrid = () => {
    return this.props.employees.map((employee,index) => {
      return (
        <tr key={employee.id}>
          <td>
            <input 
              value={employee.fullName} 
              disabled={employee.disabled} 
              className={index}
            />
          </td>
          <td>
            <input 
              value={employee.department} 
              disabled={employee.disabled}
              className={index}
            />
          </td>
          <td>
            <input 
              value={employee.computer}
              disabled={employee.disabled} 
              className={index}
            />
          </td>
          <td>
            <EmployeeDelete
              employeeId = {employee.id}
              updateState = {this.props.updateState}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <table className="table">
          <tbody>
            <tr>
              <th>Full Name</th>
              <th>Department</th>
              <th>Computer Assigned</th>
              <th>Action</th>
            </tr>
            {this.printGrid()}
            <EmployeeAdd 
              updateState = {this.props.updateState}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
