import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';
//import { DepartmentGrid } from './DepartmentGrid';
//import { Panel, Button } from 'react-bootstrap';

export class Department extends Component {
    state = {
        departments: [],
        employees: [],
        open: true
    };

    componentDidMount = () => {
        departmentRequest.getAllDepartments()
            .then((departments) => {
                this.setState({ departments });
            })
            .catch((err) => {
                console.error('Error adding an deparments: ', err);
            });
    };

    //gettingEmployees() {
    //    departmentRequest.getDeptEmployees()
    //        .then((employees) => {
    //            this.setState({ employees });
    //        })
    //        .catch((err) => {
    //            console.error('Error getting employees', err);
    //        });
    // }




    //printEmployees = () => {
    //    const employees = this.state.employees;
    //    return employees.map((employee) => {
    //        return (
    //            <div>
    //                <div className="container">
    //                    <table className="table">
    //                        <tbody>
    //                            <tr>
    //                                <th>Employee</th>
    //                            </tr>
    //                            <tr>
    //                                <td>{employee.firstName}</td>
    //                            </tr>
    //                        </tbody>
    //                    </table>
    //                </div>
    //            </div>
    //        );
    //    });
    //};

    render() {
        const printGrid = this.state.departments.map((department) => {
            return (
                <tr key={department.id}>
                    <td>{department.departmentName}</td>
                    <td><button>See Employees</button></td>
                </tr>
            );
        });
        return (
            <div>
                <h1>Departments</h1>
                <div className="container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Department</th>
                            </tr>
                                {printGrid}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
