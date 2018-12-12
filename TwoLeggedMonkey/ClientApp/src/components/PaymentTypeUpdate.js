import React from 'react';
import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';
import { Glyphicon } from 'react-bootstrap';

export class PaymentTypeUpdate extends React.Component {

    state = {
        paymentType: {
            paymentTypeName: "",
            customerId: "",
        }
    }

    formFieldStringState = (variable, e) => {
        const temporaryPaymentType = { ...this.state.paymentType };
        temporaryPaymentType[variable] = e.target.value;
        this.setState({ paymentType: temporaryPaymentType });
    }

    paymentTypeNameChanged = (e) => {
        this.formFieldStringState('paymentTypeName', e);
    }

    customerIdChanged = (e) => {
        this.formFieldStringState('customerId', e);
    }

    editPaymentType = (paymentType) => {
        const paymentTypeId = this.props.match.params.id;
        paymentTypeCalls
            .updatePaymentType()
            .then(() => {
                this.props.history.push("/paymenttypes");
            })
            .catch((error) => {
                console.error('error with edit paymenttype', error);
            })
    }

    editInputFields = (e) => {
        this.props.chang
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-warning"
                    id={this.props.id}
                //onClick={}
                >
                    <Glyphicon glyph="pencil" />
                </button>
            </div>
        )
    }
}