import React, { Component } from 'react';
import employeeRequest from '../../DBRequests/employee';
import {Button, Glyphicon } from 'react-bootstrap';

export class EmployeeDelete extends Component {
  deleteEmployee = () => {
    employeeRequest.deleteEmployee(this.props.employeeId)
    .then((res) => {
      this.props.updateState();
      this.props.resetComputers();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });
  };

  render() {
    return (
      <div className="employee-delete">
        <button className="btn btn-danger" onClick={this.deleteEmployee}><Glyphicon glyph="trash" /></button>
      </div>
    );
  }
}