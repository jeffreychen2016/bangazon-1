import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';
//import { DepartmentGrid } from './DepartmentGrid';
import { Panel, Button } from 'react-bootstrap';

export class Department extends Component {
  state = {
      departments: [],
      employees: [],
      open: true
    };

    componentDidMount() {
        departmentRequest.getAllDepartments()
            .then((departments) => {
                this.setState({ departments });
            })
            .catch((err) => {
                console.error('Error getting all department: ', err);
            });
    }

      gettingEmployees() {
          departmentRequest.getDeptEmployees()
              .then((employees) => {
                  this.setState({ employees });
              })
              .catch((err) => {
                  console.error('Error getting employees', err);
              });
    }

     //async componentDidMount() {
    //    const deptRequest = departmentRequest.getAllDepartments();
    //    const employeeRequest = departmentRequest.getDeptEmployees();
    //    const data = await Promise.all([deptRequest, employeeRequest]).catch(error => console.error({ error }));
    //    const departments = data[0].data;
    //    const employees = data[1].data;
    //    this.setState({ departments, employees });
    //}

     printGrid = () => {
        const allDepartments = this.state.departments;
        return allDepartments.map((department) => {
            return (
                <div>
                    <div>{department.departmentName}</div>
                    <Button onClick={() => this.setState({ open: !this.state.open })}> See Employee</Button>
                    <br />
                    <Panel expanded={this.state.open}>
                        <Panel.Collapse>
                            <Panel.Body>
                                {this.printEmployees}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>
            );
        });
    };

    printEmployees = () => {
        const employees = this.state.employees;
        return employees.map((employee) => {
            return (
                <div>
                    <div className="container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Employee</th>
                                </tr>
                                <tr>
                                    <td>{employee.firstName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        });
    };

    render() {

    return (
      <div>
            <h1>Department</h1>
            <this.printGrid/>
      </div>
    );
  }
}

export default Department;
