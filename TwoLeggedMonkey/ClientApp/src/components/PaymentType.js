import React, { Component } from 'react';
import { PaymentTypeDelete } from './PaymentTypeDelete';

import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';

export class PaymentType extends Component {

    state = {
        allPaymentTypes: []
    }

    getPaymentTypes = () => {
        paymentTypeCalls
            .getAllPaymentTypes()
            .then((allPaymentTypes) => {
                this.setState({ allPaymentTypes })
            })
            .catch((error) => {
                console.error('error with allPayementTypes Get Call', error);
            });
    }

    componentDidMount() {
        this.getPaymentTypes();
    };

    paymentTypeState = () => {
        this.getPaymentTypes()
    };

    render() {
        const paymentTypes = this.state.allPaymentTypes.map((paymentType) => {
            return (
                <tr key={paymentType.id}>
                    <td>{paymentType.id}</td>
                    <td>{paymentType.paymentTypeName}</td>
                    <td>{paymentType.customerId}</td>
                    <PaymentTypeDelete
                        paymentTypeId={paymentType.id}

                    />
                </tr>
            );
        })
    return (
        <div>
            <h1>Payment Types</h1>
            <div>
                <button
                    className="btn btn-default"
                    onClick={this.handleShow}> Add a Payment Type</button>
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
            
        </div>
    );
  }
}

