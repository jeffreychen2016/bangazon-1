import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Modal, Glyphicon } from 'react-bootstrap';
import './EmployeeFilterForm.css';
import employeeRequest from '../../DBRequests/employee';

export class EmployeeSearchButton extends Component {
  getFilteredEmployees = (firstName,lastName,departmentId,employeeTypeId,assignedComputer) => {
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