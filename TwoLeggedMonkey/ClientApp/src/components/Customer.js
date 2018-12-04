import React, { Component } from 'react';
import customersRequest from '../DBRequests/customers';
import { Modal, ControlLabel, FormControl } from 'react-bootstrap';

export class Customer extends Component {
    state = {
        customers: [],
        newCustomer: {
            firstName: '',
            lastName: '',
            isActive: true
        },
        show: false,
    }

    // modal

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

    // form submit event

    formSubmitEvent = (e) => {
        const newCustomer = { ...this.state.newCustomer };
        e.preventDefault();
        customersRequest.postRequest(newCustomer)
            .then(() => {
                this.setState({
                    newCustomer: {
                        firstName: '',
                        lastName: ''
                    }
                })
            })
            .catch((error) => {
                console.error('There was an error posting the new customer ->', error);
            })
    }

    submitBtnEvent = () => {
        
    }

    changeFirstName = (e) => {
        const tempNewCustomer = { ...this.state.newCustomer };
        tempNewCustomer.firstName = e.target.value;
        this.setState({ newCustomer: tempNewCustomer });
    }

    changeLastName = (e) => {
        const tempNewCustomer = { ...this.state.newCustomer };
        tempNewCustomer.lastName = e.target.value;
        this.setState({ newCustomer: tempNewCustomer });
    }

    // button events

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

    const { newCustomer } = this.state;

    const { firstName, lastName } = this.state.newCustomer;
    const isEnabled =
        firstName.length > 0 &&
        lastName.length > 0;

    return (
      <div className="container">
            <h1>Customers</h1>
            <button
                className="btn add-new"
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleShow} >
                Add New
            </button>

            <table className="table">
                <tbody>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Active</th>
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
                    <form onSubmit={this.formSubmitEvent}>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={newCustomer.firstName}
                            onChange={this.changeFirstName}
                        />

                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            onChange={this.changeLastName}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.submitBtnEvent}
                            disabled={!isEnabled}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default Customer;