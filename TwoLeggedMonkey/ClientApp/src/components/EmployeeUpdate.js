import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeDepartmentList } from './EmployeeDepartmentList';
import { EmployeeComputerList } from './EmployeeComputerList';
import employeeRequest from '../DBRequests/employee';

export class EmployeeUpdate extends Component {

  state = {
    newEmployee: {},
    show: false
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
          this.setState({ show: true });
        });
      })
      .catch((err) => {
        console.error('Error updating the employee: ', err);
      })
  };

  modal = () => {
    // if (this.state.newEmployee.firstName) {
      return (
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>New Order</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <label>First Name:</label><input value={this.state.newEmployee.firstName}/>
            <label>Last Name:</label><input value={this.state.newEmployee.lastName}/>
            <label>Department:</label><EmployeeDepartmentList />
            <label>Employee Type:</label><EmployeeTypeList />
            <label>Assigned Computer:</label><EmployeeComputerList />
          </Modal.Body>
  
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.postOrder}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
    // }
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