import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';
import { DepartmentGrid } from './DepartmentGrid';

export class Department extends Component {
  state = {
      departments: [],
      employees: []
    };

    //async componentDidMount() {
    //    const deptRequest = departmentRequest.getAllDepartments();
    //    const employeeRequest = departmentRequest.getDeptEmployees();
    //    const data = await Promise.all([deptRequest, employeeRequest]).catch(error => console.error({ error }));
    //    const departments = data[0].data;
    //    const employees = data[1].data;
    //    this.setState({ departments, employees });
    //}

  componentDidMount () {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        this.setState({departments});
      })
      .catch((err) => {
        console.error('Error getting all department: ', err);
          });
      //departmentRequest.getDeptEmployees()
      //    .then((employees) => {
      //        this.setState({ employees });
      //    })
      //    .catch((err) => {
      //        console.error('Error getting employees', err);
      //    });
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