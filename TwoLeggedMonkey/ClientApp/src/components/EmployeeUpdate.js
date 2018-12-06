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

  componentDidMount () {
    
  }

  modal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input placeholder="First Name" value={}/>
          <input placeholder="Last Name" onChange={this.isCompleteCreate}/>
          <input placeholder="Department" onChange={this.isActiveCreate}/>
          <input placeholder="Employee Type" onChange={this.isActiveCreate}/>
          <input placeholder="Assigned Computer" onChange={this.isActiveCreate}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
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