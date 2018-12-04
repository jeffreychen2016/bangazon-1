import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';

export class PaymentTypePost extends Component {

    state = {

        show: false,
        newPaymentType: {
            paymentTypeName: '',
            customerId: '',
        }
    }

    formFieldStringState = (variable, e) => {
        const temporaryPaymentType = { ...this.state.newPaymentType };
        temporaryPaymentType[variable] = e.target.value;
        this.setState({ newPaymentType: temporaryPaymentType });
    }

    paymentTypeNameChanged = (e) => {
        this.formFieldStringState('paymentTypeName', e);
    }

    customerIdChanged = (e) => {
        this.formFieldStringState('customerId', e);
    }

    postPaymentTypes = () => {
        const newPaymentType = { ...this.state.newPaymentType };
        paymentTypeCalls
            .postPaymentType(newPaymentType)
            .then(() => {
                this.props.successfulFormPost();
            })
            .catch((error) => {
                console.error('error with postPayTypes request', error);
            });
    }

    postSubmission = (e) => {
        const { newPaymentType } = this.state;
        e.preventDefault();
        if (
            newPaymentType.paymentTypeName &&
            newPaymentType.customerId
        ) {
            this.postPaymentTypes(this.state.newPaymentType);
            this.setState({ newState: newPaymentType });
        } else {
            alert('Error. Please fill out all inputs.');
        }
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


    render() {
        const { newPaymentType } = this.state;
        return (
            <div>
                <div>
                    <button
                        className="btn btn-default"
                        onClick={this.handleShow}> 
                        Add a Payment Type
                    </button>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>New Order</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input
                            placeholder="Payment Type Name"
                            type="input"
                            id="paymentTypeName"
                            value={newPaymentType.paymentTypeName}                     
                            onChange={this.paymentTypeNameChanged}
                        />
                        <input
                            placeholder="Customer Id"
                            type="input"
                            id="customerId"
                            value={newPaymentType.customerId}
                            onChange={this.paymentTypeNameChanged}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={this.handleClose}
                        >Close</Button>
                        <Button
                            bsStyle="primary"
                            type="submit"
                            onClick={this.postPaymentType}
                        >Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

