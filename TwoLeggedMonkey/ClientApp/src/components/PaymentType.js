import React, { Component } from 'react';
import { PaymentTypeDelete } from './PaymentTypeDelete';
import { PaymentTypePost } from './PaymentTypePost';
import { PaymentTypeUpdate } from './PaymentTypeUpdate';

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
                    <td>
                        <PaymentTypeUpdate
                        paymentTypeName = {paymentType.id}
                        paymentTypes = {this.props.paymentTypes}
                        paymentType = {paymentType}
                        />
                     </td>
                    <td>
                        <PaymentTypeDelete
                        paymentTypeId={paymentType.id}
                        />
                    </td>
                </tr>
            );
        })
    return (
        <div>
            <h1>Payment Types</h1>
            <div>
                
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Payment Type Id</th>
                            <th>Payment Type Name</th>
                            <th>Customer Id</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                        {paymentTypes}   
                        <PaymentTypePost />
                    </tbody>
                </table>
            </div>
            
        </div>
    );
  }
}

