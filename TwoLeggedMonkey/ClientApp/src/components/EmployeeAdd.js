import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';
import departmentRequest from '../DBRequests/department';
import { EmployeeDepartmentList } from './EmployeeDepartmentList'; 

export class EmployeeAdd extends Component {
  state = {
    newEmployee:{
      firstName: '',
      lastName: '',
      departmentId: 0,
      employeeTypeId: 0,
      assignedComputer: 0
    }
  };

  firstNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.firstName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  };

  lastNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.lastName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  departmentIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.departmentId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  employeeTypeIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.employeeTypeId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  assignedComputerChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.assignedComputer = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  addEmployee = () => {
    employeeRequest.addEmployee(this.state.newEmployee)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error adding an employee: ', err);
    });
  };

  render() {
    return (
      <tr>
        <td>
          <input 
            onChange={this.firstNameChange} 
            value={this.state.newEmployee.firstName}
            placeholder="First Name"
          />
        </td>
        <td>
          <input 
            onChange={this.lastNameChange} 
            value={this.state.newEmployee.lastName}
            placeholder="Last Name"
          />
        </td>
        <td>
          <EmployeeDepartmentList />
        </td>
        <td>
          <input 
            onChange={this.employeeTypeIdChange} 
            value={this.state.newEmployee.employeeTypeId}
            placeholder="Employee Type Id"
          />
        </td>
        <td>
          <input 
            onChange={this.assignedComputerChange} 
            value={this.state.newEmployee.assignedComputer}
            placeholder="Assigned Computer"
          />
        </td>
        <td><button onClick={this.addEmployee}>Add</button></td>
      </tr>
    );
  }
}