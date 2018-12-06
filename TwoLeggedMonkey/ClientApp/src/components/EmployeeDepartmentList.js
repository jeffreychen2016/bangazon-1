import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';

export class EmployeeDepartmentList extends Component {
  state = {
    departments: []
  }

  componentDidMount = () => {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        this.setState({departments});
      })
      .catch((err) => {
        console.error('Error adding an deparments: ', err);
      })
  };

  printDepartments = () => {
    const departments = this.state.departments;
    if (departments.length) {
      return departments.map((department) => {
        return (<option value={department.id} key={department.id}>{department.departmentName}</option>);
      });
    }
  };

  render() {
    return (
      <select onChange={this.props.departmentIdChange}>
        {this.printDepartments()}
      </select>
    );
  }
}