import React, { Component } from 'react';
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeDepartmentList } from './EmployeeDepartmentList';
import { EmployeeComputerList } from './EmployeeComputerList';
import employeeRequest from '../../DBRequests/employee';
import computerRequest from '../../DBRequests/computer';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Modal, Glyphicon } from 'react-bootstrap';
import './EmployeeUpdate.css';

export class EmployeeUpdate extends Component {

  state = {
    newEmployee: {},
    show: false,
    computers: [],
    departments:[],
    employeeTypes:[]
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (e) =>{
    this.getEmployeeById(e.target.id);
  };

  getEmployeeById (id) {
    employeeRequest.getEmployeeById(id)
      .then((employee) => {
        this.setState({newEmployee: employee}, () => {
          // the modal needs value from state
          // use this call back to ensure the state has been set
          // before provide value to modal
          this.setState({ show: true });
        });
      })
      .catch((err) => {
        console.error('Error getting the employee: ', err);
      })
  };

  getComputers = () => {
    computerRequest.GetAllAvailableAndOperableComputers()
    .then((computers) => {
      this.setState({computers});
    })
    .catch((err) => {
      console.error('Error adding an employee types: ', err);
    })
  };

  firstNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.firstName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

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

  updateEmployee = (e) => {
    employeeRequest.updateEmployee(this.props.employeeId,this.state.newEmployee)
      .then((res) => {
        this.props.updateState();
        // this.getComputers();
        this.props.resetComputers();
        this.handleClose();
      })
      .catch((err) => {
        console.error('Error updating the employee: ', err);
      })
  }

  updateComputers = (computers) => {
    this.setState({computers});
  };

  updateDepartments = (departments) => {
    this.setState({departments});
  };

  updateEmployeeTypes = (employeeTypes) => {
    this.setState({employeeTypes});
  };

  modal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal className="form-update-employee">
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
                  updateDepartments={this.updateDepartments}
                  departments={this.state.departments}
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
                  updateEmployeeTypes={this.updateEmployeeTypes}
                  employeeTypes={this.state.employeeTypes}
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
                  updateComputers={this.updateComputers}
                  computers={this.state.computers}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.updateEmployee}><Glyphicon glyph="floppy-save" /></Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <div className="employee-update">
        <button 
          className="btn btn-default" 
          id={this.props.employeeId} 
          onClick={this.handleShow}>
          <Glyphicon glyph="pencil" />
        </button>
        {this.modal()}
      </div>
    );
  }
}