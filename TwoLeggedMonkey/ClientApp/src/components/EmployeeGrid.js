import React, { Component } from 'react';
import { EmployeeDelete } from './EmployeeDelete';
import { EmployeeAdd } from './EmployeeAdd';
import { EmployeeUpdate } from './EmployeeUpdate';
import computerRequest from '../DBRequests/computer';

export class EmployeeGrid extends Component {
  state = {
    computers: []
  }

  resetComputers = () => {
    computerRequest.GetAllAvailableAndOperableComputers()
    .then((computers) => {
      this.setState({computers});
    })
    .catch((err) => {
      console.error('Error adding an employee types: ', err);
    })
  };

  updateComputers = (computers) => {
    this.setState({computers});
  };

  printGrid = () => {
    return this.props.employees.map((employee,index) => {
      return (
        <tr key={employee.id}>
          <td>
            <input 
              value={employee.fullName} 
              disabled={employee.disabled} 
              className={index}
              // onChange={this.props.fullNameChange} 
            />
          </td>
          <td>
            <input 
              value={employee.department} 
              disabled={employee.disabled}
              className={index}
              onChange={this.props.departmentChange} 
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
              resetComputers = {this.resetComputers}
            />
          </td>
          <td>
            <EmployeeUpdate
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
              resetComputers = {this.resetComputers}
              updateComputers = {this.updateComputers}
              computers = {this.state.computers}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
