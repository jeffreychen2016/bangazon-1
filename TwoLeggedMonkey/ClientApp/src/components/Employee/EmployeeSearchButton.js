import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Modal, Glyphicon } from 'react-bootstrap';
import './EmployeeFilterForm.css';
import employeeRequest from '../../DBRequests/employee';

export class EmployeeSearchButton extends Component {

  getFilteredEmployees = () => {
    const firstName = this.props.firstName === '' ? null : this.props.firstName;
    const lastName = this.props.lastName === '' ? null : this.props.lastName;
    const departmentId = this.props.department === '' ? null : this.props.department;
    const employeeTypeId = this.props.employeeType === '' ? null : this.props.employeeType;
    const assignedComputer = this.props.assignedComputer === '' ? null : this.props.assignedComputer;
    console.error('firstName:',firstName);
    console.error('lastName:',lastName);


    employeeRequest.getFilteredEmployees(firstName,lastName,departmentId,employeeTypeId,assignedComputer)
      .then((employees) => {
        console.error(employees);
      })
      .catch((err) => {
        console.error('Error getting filtered employees: ',err);
      })
  }

  render() {
    return (
      <div className="employee-search-button">
        <Button onClick={this.getFilteredEmployees}>Search</Button>
      </div>
    );
  }
}