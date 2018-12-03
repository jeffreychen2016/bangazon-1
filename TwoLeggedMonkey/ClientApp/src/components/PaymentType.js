import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';

import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';

const blankPaymentType = {
    paymentTypeName: '',
    customerId: '',
}

export class PaymentType extends Component {

    state = {
        allPaymentTypes: [],
        show: false,
    }

    componentDidMount() {
        paymentTypeCalls
            .getAllPaymentTypes()
            .then((allPaymentTypes) => {
                this.setState({ allPaymentTypes })
            })
            .catch((error) => {
                console.error('error with allPayementTypes Get Call', error);
            });
    };


    deletePaymentTypeEvent = (e) => {
        const paymentTypeToAx = e.target.id;
        paymentTypeCalls
            .deletePaymentType(paymentTypeToAx)
            .then(() => {
                this.componentDidMount();
            })
            .catch((error) => {
                console.error('problem with delete Payment Type', error);
            });
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
        const paymentTypes = this.state.allPaymentTypes.map((paymentType) => {
            return (
                <tr key={paymentType.id}>
                    <td>{paymentType.id}</td>
                    <td>{paymentType.paymentTypeName}</td>
                    <td>{paymentType.customerId}</td>
                    <button
                        className="btn btn-danger"
                        onClick={this.deletePaymentTypeEvent}
                        id={paymentType.id}>
                        <Glyphicon glyph="trash" />
                    </button>
                </tr>
            );
        })
    return (
        <div>
            <h1>Payment Types</h1>
            <div>
                <button
                    className="btn btn-default"
                    onClick="show"> Add a Payment Type</button>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Payment Type Id</th>
                            <th>Payment Type Name</th>
                            <th>Customer Id</th>
                        </tr>
                        {paymentTypes}
                    </tbody>
                </table>
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>New Order</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input placeholder="Payment Type Name" />
                    <input placeholder="Customer Id" />
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
}

