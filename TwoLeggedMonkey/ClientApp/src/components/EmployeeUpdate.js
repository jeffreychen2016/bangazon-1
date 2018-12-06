import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';

export class EmployeeUpdate extends Component {

  unlockInputFields = () => {
    this.props.changeInputStatus(this.props.employees,this.props.employeeId);
  };

  updateEmployee = (e) => {
    employeeRequest.updateEmployee(e.target.id,this.props.employee)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });

    this.props.updateState();
  }

  renderButton = () => {
    if (this.props.employee.disabled) {
      return <button onClick={this.unlockInputFields}>Unclock</button>;
    } else {
      return <button id={this.props.id} onClick={this.updateEmployee}>Update</button>;      
    }
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    );
  }
}