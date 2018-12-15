import React, { Component } from 'react';
import departmentRequest from '../../DBRequests/department';
import './EmployeeDepartmentList.css';

export class EmployeeDepartmentList extends Component {

  componentDidMount = () => {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        this.props.updateDepartments(departments);
      })
      .catch((err) => {
        console.error('Error adding an deparments: ', err);
      })
  };

  printDepartments = () => {
    const departments = this.props.departments;
    if (departments.length) {
      return departments.map((department) => {
        return (<option value={department.id} key={department.id}>{department.departmentName}</option>);
      });
    }
  };

  render() {
    return (
      <select onChange={this.props.departmentIdChange} className="employee-department-list">
        <option value="Choose here">Choose here</option>
        {this.printDepartments()}
      </select>
    );
  }
}