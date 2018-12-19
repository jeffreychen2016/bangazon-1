
//import React, { Component } from 'react';
//import { Panel, Button } from 'react-bootstrap';
//import React, { Component } from 'react';
//import { Button, Glyphicon } from 'react-bootstrap';


//export class DepartmentGrid extends Component {

//    printGrid = () => {
//        const allDepartments = this.props.departments;
//        return allDepartments.map((department) => {
//            return (
//                <div>
//                    <div>{department.departmentName}</div>
//                    <Button onclick={() => this.setState({ open: !this.props.open })}> See Employee</Button>
//                    <br />
//                    <Panel expanded={this.props.open}>
//                        <Panel.Collapse>
//                            <Panel.Body>
//                                {this.printEmployees}
//                            </Panel.Body>
//                        </Panel.Collapse>
//                    </Panel>
//                </div>
//            );
//        });
//    }


//    printEmployees = () => {
//        const employees = this.props.employees;
//        return employees.map((employee) => {
//            return (
//                <div>
//                    <div className="container">
//                        <table className="table">
//                            <tbody>
//                                <tr>
//                                    <th>Employee</th>
//                                </tr>
//                                <tr>
//                                    <td>{employee.firstName}</td>
//                                </tr>
//                            </tbody>
//                        </table>
//                    </div>
//                </div>
//            );
//        });
//    };

//    render() {
//        return (
//            <this.printGrid />
//        );
//    }
//}
