import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class EmployeeUpdate extends Component {

  state = {
    show: false
  };
  
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () =>{
    this.setState({ show: true });
  }

  modal = () => {
    return (
      <Modal show={this.state.show} onHide={this.state.handleClose}>
        <Modal.Header>
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input placeholder="Customer Id" onChange={this.customerIdCreate}/>
          <input placeholder="Completeion Status" onChange={this.isCompleteCreate}/>
          <input placeholder="Active Status" onChange={this.isActiveCreate}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.state.handleClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.postOrder}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.handleShow}>Update</button>
        {this.modal()}
      </div>
    );
  }
}