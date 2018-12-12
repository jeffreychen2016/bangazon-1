import React, { Component } from 'react';
import employeeRequest from '../../DBRequests/employee';
import { EmployeeDepartmentList } from './EmployeeDepartmentList'; 
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeComputerList } from './EmployeeComputerList';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './EmployeeAdd.css';

export class EmployeeAdd extends Component {
  state = {
    newEmployee:{
      firstName: '',
      lastName: '',
      departmentId: '',
      employeeTypeId: '',
      assignedComputer: ''
    }
  };

  firstNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.firstName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  };

  lastNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.lastName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  departmentIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.departmentId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  employeeTypeIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.employeeTypeId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  assignedComputerChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.assignedComputer = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  addEmployee = () => {
    employeeRequest.addEmployee(this.state.newEmployee)
    .then((res) => {
      this.props.updateState();
      // reset computers drop-down to 'Choose Here'
      this.props.resetDepartments();
      this.props.resetComputers();
      this.props.resetEmployeeTypes();
    })
    .catch((err) => {
      console.error('Error adding an employee: ', err);
    });
  };

  render() {
    return (

      <Form horizontal className="form-add-employee">
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            First Name
          </Col>
          <Col sm={8}>
            <FormControl 
              type="text" 
              placeholder="First Name"  
              onChange={this.firstNameChange} 
              value={this.state.newEmployee.firstName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Last Name
          </Col>
          <Col sm={8}>
            <FormControl 
              type="text" 
              placeholder="Last Name"  
              onChange={this.lastNameChange} 
              value={this.state.newEmployee.lastName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Department
          </Col>
          <Col sm={8}>
            <EmployeeDepartmentList 
              departmentIdChange={this.departmentIdChange}
              updateDepartments={this.props.updateDepartments}
              departments = {this.props.departments}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Employee Type
          </Col>
          <Col sm={8}>
            <EmployeeTypeList 
              employeeTypeIdChange={this.employeeTypeIdChange}
              updateEmployeeTypes = {this.props.updateEmployeeTypes}
              employeeTypes = {this.props.employeeTypes}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Assigned Computer
          </Col>
          <Col sm={8}>
            <EmployeeComputerList 
              assignedComputerChange={this.assignedComputerChange}
              updateComputers={this.props.updateComputers}
              computers={this.props.computers}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Button bsStyle="success"  onClick={this.addEmployee} className="employee-add-btn">Add</Button>
        </FormGroup>
      </Form>
    );
  }
}