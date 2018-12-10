import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';

export class PaymentTypeDelete extends Component {

    deletePaymentTypeEvent = (e) => {
        paymentTypeCalls
            .deletePaymentType(this.props.paymentTypeId)
            .then(() => {
                this.props.paymentTypeState();
                this.props.componentDidMount();
            })
            .catch((error) => {
                console.error('problem with delete Payment Type', error);
            });
    };

    render() {
            return (
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={this.deletePaymentTypeEvent}>
                        <Glyphicon glyph="trash"/>
                    </button>
                </div>
            );

    }
}


