import React, { Component } from 'react';
import customersRequest from '../DBRequests/customers';
import { Glyphicon, Modal, Checkbox, Radio, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class Customer extends Component {
    state = {
        customers: [],
        newCustomer: {},
        show: false,
    }

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    addNewCustomer = () => {
        const tempNewCustomer = { ...this.state.customers };
    }

    deactivateCustomer = (e) => {
        const customerToDeactivate = e.target.id;
        customersRequest
            .deactivationRequest(customerToDeactivate)
            .then(() => {
                this.componentDidMount();
            })
            .catch((error) => {
                console.error("trouble making customer inactive ->", error);
            })
    }

    componentDidMount() {
        customersRequest
            .getRequest()
            .then((customers) => {
                this.setState({ customers });
            })
            .catch(err => {
                console.error('Error with customers get request ->', err);
            })
    }

    render() {
        const customerComponents = this.state.customers.map((customer) => {
            return (
                <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    {customer.isActive === true ? <td>Active</td> : <td>Not Active</td>}
                    <td><button className="btn btn-default" id={customer.id} onClick={(e) => this.deactivateCustomer(e)}>Deactivate</button></td>
                </tr>
            );
        });
    return (
      <div className="container">
            <h1>Customers</h1>

            <table className="table">
                <tbody>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Active</th>
                    <th>
                        <button
                                bsStyle="primary"
                                bsSize="large"
                                onClick={this.handleShow} >
                            <Glyphicon glyph="plus" />
                        </button>
                    </th>
                </tr>
                    {customerComponents}
                </tbody>
            </table>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Add a New Customer</h4>
                    <form>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />

                        <button type="submit">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default Customer;