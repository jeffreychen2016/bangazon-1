import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';
import computerRequest from '../DBRequests/computer';

export class EmployeeDelete extends Component {
  deleteEmployee = () => {
    employeeRequest.deleteEmployee(this.props.employeeId)
    .then((res) => {
      this.props.updateState();
      this.resetComputers();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });
  };

  resetComputers = () => {
    computerRequest.GetAllAvailableAndOperableComputers()
    .then((computers) => {
      this.setState({computers});
    })
    .catch((err) => {
      console.error('Error adding an employee types: ', err);
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.deleteEmployee}>Delete</button>
      </div>
    );
  }
}