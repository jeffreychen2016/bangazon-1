import React, { Component } from 'react';
import employeeRequest from '../../DBRequests/employee';
import { EmployeeGrid } from './EmployeeGrid';
import { EmployeeFilterButton } from './EmployeeFilterButton';
import { EmployeeFilterForm } from './EmployeeFilterForm';
import './Employee.css';

export class Employee extends Component {
  state = {
    employees: [],
    departments: [],
    employeeTypes: [],
    computers: [],
    filterActive: false
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

  toggleFilterForm = () => {
    this.setState({filterActive : !this.state.filterActive}, () => {
    });
  }

  updateEmployees = (employees) => {
    this.setState({employees});
  }

  updateDepartments = (departments) => {
    this.setState({departments});
  }

  updateEmployeeTypes = (employeeTypes) => {
    this.setState({employeeTypes});
  }

  updateComputers = (computers) => {
    this.setState({computers});
  }

  render() {
    return (
      <div className="employee">
        <h1>Employee</h1>
        <EmployeeFilterButton 
          toggleFilterForm = {this.toggleFilterForm}
        />
        {this.state.filterActive ? 
        <EmployeeFilterForm  
          updateEmployees = {this.updateEmployees} 
          updateDepartments = {this.updateDepartments}
          departments = {this.state.departments}
          updateEmployeeTypes = {this.updateEmployeeTypes}
          employeeTypes = {this.state.employeeTypes}
          updateComputers = {this.updateComputers}
          computers = {this.state.computers}
        /> : null}
        <EmployeeGrid 
          employees = {this.state.employees}
          updateState = {this.updateState}
          changeInputStatus = {this.changeInputStatus}
        />
      </div>
    );
  }
}
