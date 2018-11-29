import React, { Component } from 'react';

import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';


export class PaymentType extends Component {

    state = {
        allPaymentTypes: [],
    }

    componentDidMount() {
        paymentTypeCalls
            .getAllPaymentTypes()
            .then((allPaymentTypes) => {
                this.setState({allPaymentTypes})
            })
            .catch((error) => {
                console.error('error with allPayementTypes Get Call', error);
            });
    };




    render() {
        const paymentTypes = this.state.allPaymentTypes.map((paymentType) => {
            return (
                <div key={paymentType.id}>
                    
                        <h1>PaymentType</h1>
                        <h3>{paymentType.id}</h3>
                        <h3>{paymentType.paymentTypeName}</h3>

              
                </div>
            );
        })
    return (
        <div>
            {paymentTypes}
        </div>
    );
  }
}

