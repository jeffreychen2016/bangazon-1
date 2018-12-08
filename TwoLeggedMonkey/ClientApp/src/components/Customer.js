import React, { Component } from 'react';
import customersRequest from '../DBRequests/customers';
import { Glyphicon, Modal, ControlLabel, FormControl } from 'react-bootstrap';

export class Customer extends Component {
    state = {
        customers: [],
        newCustomer: {
            firstName: '',
            lastName: '',
            isActive: true
        },
        show: false,
        showEdit: false,
        updateCustomer: {
            firstName: '',
            lastName: '',
            id: '',
            isActive: true
        }
    }

    // modal

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
        this.setState({ showEdit: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleShowEdit(e) {
        this.setState({
            showEdit: true,
            updateCustomer: {
                firstName: e.firstName,
                lastName: e.lastName,
                id: e.id
            }
        });
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

    editCustomer = (e) => {
        const updatedCustomer = { ...this.state.updateCustomer };
        e.preventDefault();
        customersRequest
            .putRequest(updatedCustomer.id, updatedCustomer)
            .then(() => {
                this.componentDidMount();
            })
            .catch((error) => {
                console.error("trouble updating customer ->", error);
            })
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

    updateFirstName = (e) => {
        const tempNewCustomer = { ...this.state.updateCustomer };
        tempNewCustomer.firstName = e.target.value;
        this.setState({ updateCustomer: tempNewCustomer });
    }

    updateLastName = (e) => {
        const tempNewCustomer = { ...this.state.updateCustomer };
        tempNewCustomer.lastName = e.target.value;
        this.setState({ updateCustomer: tempNewCustomer });
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
                <td>
                    <button
                        className="btn btn-default"
                        id={customer.id}
                        onClick={() => this.handleShowEdit(customer)}>
                        <Glyphicon glyph="pencil" />
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-danger"
                        id={customer.id}
                        onClick={(e) => this.deactivateCustomer(e)}
                        disabled={!customer.isActive}>
                        <Glyphicon glyph="trash" />
                    </button>
                </td>
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
                    <Modal.Title>Add a New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            onClick={this.handleClose}
                            disabled={!isEnabled}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={this.state.showEdit} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Existing Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.editCustomer}>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.updateCustomer.firstName}
                            onChange={this.updateFirstName}
                        />

                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.updateCustomer.lastName}
                            onChange={this.updateLastName}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleClose}
                        >
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default Customer;