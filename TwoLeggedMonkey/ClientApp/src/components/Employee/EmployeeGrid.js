import React, { Component } from 'react';
import { EmployeeDelete } from './EmployeeDelete';
import { EmployeeAdd } from './EmployeeAdd';
import { EmployeeUpdate } from './EmployeeUpdate';
import computerRequest from '../../DBRequests/computer';
import departmentRequest from '../../DBRequests/department';
import employeeTypeRequest from '../../DBRequests/employeeType';

export class EmployeeGrid extends Component {
  state = {
    computers: [],
    departments: [],
    employeeTypes: []
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

  resetDepartments = () => {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        // since if there department data does not change
        // the react will not re-render the component
        // so set the derpartment to empty first then re-populate the data
        // to trigger render
        this.setState({departments:[]}, () => {
          this.setState({departments});
        })
      })
      .catch((err) => {
        console.error('Error adding an deparments: ', err);
      })
  };

  resetEmployeeTypes = () => {
    employeeTypeRequest.getAllEmployeeTypes()
      .then((employeeTypes) => {
        this.setState({employeeTypes:[]},() => {
          this.setState({employeeTypes});
        });
      })
      .catch((err) => {
        console.error('Error adding an employee types: ', err);
      })
  };

  updateComputers = (computers) => {
    this.setState({computers});
  };

  updateDepartments = (departments) => {
    this.setState({departments});
  }

  updateEmployeeTypes = (employeeTypes) => {
    this.setState({employeeTypes});
  }

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
              resetComputers = {this.resetComputers}
            />
            <EmployeeUpdate
              employeeId = {employee.id}
              updateState = {this.props.updateState}
              resetComputers = {this.resetComputers}
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
              resetDepartments = {this.resetDepartments}
              resetEmployeeTypes = {this.resetEmployeeTypes}
              updateComputers = {this.updateComputers}
              updateDepartments = {this.updateDepartments}
              updateEmployeeTypes = {this.updateEmployeeTypes}
              computers = {this.state.computers}
              departments = {this.state.departments}
              employeeTypes = {this.state.employeeTypes}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
