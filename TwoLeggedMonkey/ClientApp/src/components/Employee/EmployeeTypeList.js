import React, { Component } from 'react';
import employeeTypeRequest from '../../DBRequests/employeeType';
import './EmployeeTypeList.css';

export class EmployeeTypeList extends Component {

  componentDidMount = () => {
    employeeTypeRequest.getAllEmployeeTypes()
      .then((employeeTypes) => {
        this.props.updateEmployeeTypes(employeeTypes);
      })
      .catch((err) => {
        console.error('Error adding an employee types: ', err);
      })
  };

  printEmployeeTypes = () => {
    const employeeTypes = this.props.employeeTypes;
    if (employeeTypes.length) {
      return employeeTypes.map((employeeType) => {
        return (<option value={employeeType.id} key={employeeType.id}>{employeeType.employeeTypeName}</option>);
      });
    }
  };

  render() {
    return (
      <select onChange={this.props.employeeTypeIdChange} className="employee-type-list">
        <option value="Choose here">Choose here</option>
        {this.printEmployeeTypes()}
      </select>
    );
  }
}