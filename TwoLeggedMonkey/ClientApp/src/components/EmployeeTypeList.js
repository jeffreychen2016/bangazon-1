import React, { Component } from 'react';
import employeeTypeRequest from '../DBRequests/employeeType';

export class EmployeeTypeList extends Component {
  state = {
    employeeTypes: []
  }

  componentDidMount = () => {
    employeeTypeRequest.getAllEmployeeTypes()
      .then((employeeTypes) => {
        this.setState({employeeTypes});
      })
      .catch((err) => {
        console.error('Error adding an employee types: ', err);
      })
  };

  printEmployeeTypes = () => {
    const employeeTypes = this.state.employeeTypes;
    if (employeeTypes.length) {
      return employeeTypes.map((employeeType) => {
        return (<option key={employeeType.id}>{employeeType.employeeTypeName}</option>);
      });
    }
  };

  render() {
    return (
      <select>
        {this.printEmployeeTypes()}
      </select>
    );
  }
}