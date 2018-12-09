import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';

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
      <div>
        <button onClick={this.deleteEmployee}>Delete</button>
      </div>
    );
  }
}