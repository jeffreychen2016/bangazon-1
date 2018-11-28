import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';


export class PaymentType extends Component {

    state = {
        allPaymentTypes: [],
    }

    componentDidMount() {
        paymentTypeCalls
            .then((allPaymentTypes) => {
                this.setState({allPaymentTypes})
            })
            .catch((error) => {
                console.error('error with allPayementTypes Get Call', error);
            });
    };




  render() {
    return (
        <div>
            <Link to={`/paymenttype`}>

                <h1>PaymentType</h1>
                <h3>{allPaymentTypes.Id}</h3>
                <h3>{allPaymentTypes.PaymentType}</h3>
               
            </Link>
      </div>
    );
  }
}

