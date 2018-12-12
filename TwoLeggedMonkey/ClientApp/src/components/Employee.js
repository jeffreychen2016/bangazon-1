import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';
import { EmployeeGrid } from './EmployeeGrid';

export class Employee extends Component {
  state = {
    employees: []
  };

  getAllEmployees = () => {
    employeeRequest.getAllEmployees()
      .then((employees) => {
        employees.forEach(employee => {
          employee.disabled = true;
        })
        this.setState({employees});
      })
      .catch((err) => {
        console.error('Error getting all employees: ', err);
      });
  }

  componentDidMount () {
    this.getAllEmployees();
  }

  updateState = () => {
    this.getAllEmployees();
  };

  changeInputStatus = (allEmployees,employeeId) => {
    const employees = [];
    allEmployees.forEach(employee => {
      if (employee.id === employeeId) {
        employee.disabled = !employee.disabled;
        employees.push(employee);
      } else {
        employees.push(employee);
      }
    })
    this.setState({employees});
  };

  render() {
    return (
      <div>
        <h1>Employee</h1>
        <EmployeeGrid 
          employees = {this.state.employees}
          updateState = {this.updateState}
          changeInputStatus = {this.changeInputStatus}
        />
      </div>
    );
  }
}
