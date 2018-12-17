import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Modal, Glyphicon } from 'react-bootstrap';
import './EmployeeFilterForm.css';
import employeeRequest from '../../DBRequests/employee';

export class EmployeeSearchButton extends Component {

  getFilteredEmployees = () => {
    const firstName = this.props.firstName === '' ||  this.props.firstName ===  'Choose here' ? null : this.props.firstName;
    const lastName = this.props.lastName === '' || this.props.lastName ===  'Choose here' ? null : this.props.lastName;
    const departmentId = this.props.department === '' || this.props.department ===  'Choose here' ? null : this.props.department;
    const employeeTypeId = this.props.employeeType === '' || this.props.employeeType ===  'Choose here'  ? null : this.props.employeeType;
    const assignedComputer = this.props.assignedComputer === '' || this.props.assignedComputer ===  'Choose here' ? null : this.props.assignedComputer;

    employeeRequest.getFilteredEmployees(firstName,lastName,departmentId,employeeTypeId,assignedComputer)
      .then((employees) => {
        this.props.updateEmployees(employees);
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