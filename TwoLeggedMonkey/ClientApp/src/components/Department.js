import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';
import { DepartmentGrid } from './DepartmentGrid';

export class Department extends Component {
  state = {
    departments: []
  };

  componentDidMount () {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        this.setState({departments});
      })
      .catch((err) => {
        console.error('Error getting all department: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1>Department</h1>
        <DepartmentGrid 
          departments = {this.state.departments}
        />
      </div>
    );
  }
}