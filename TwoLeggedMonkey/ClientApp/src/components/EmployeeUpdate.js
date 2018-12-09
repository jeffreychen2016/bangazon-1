import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeDepartmentList } from './EmployeeDepartmentList';
import { EmployeeComputerList } from './EmployeeComputerList';
import employeeRequest from '../DBRequests/employee';
import computerRequest from '../DBRequests/computer';

export class EmployeeUpdate extends Component {

  state = {
    newEmployee: {},
    show: false,
    computers: []
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

  modal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>First Name:</label><input onChange={this.firstNameChange} value={this.state.newEmployee.firstName}/>
          <label>Last Name:</label><input onChange={this.lastNameChange} value={this.state.newEmployee.lastName}/>
          <label>Department:</label><EmployeeDepartmentList departmentIdChange={this.departmentIdChange}/>
          <label>Employee Type:</label><EmployeeTypeList employeeTypeIdChange={this.employeeTypeIdChange}/>
          <label>Assigned Computer:</label>
          <EmployeeComputerList 
            assignedComputerChange={this.assignedComputerChange}
            updateComputers={this.updateComputers}
            computers={this.state.computers}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.updateEmployee}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        <button id={this.props.employeeId} onClick={this.handleShow}>Update</button>
        {this.modal()}
      </div>
    );
  }
}