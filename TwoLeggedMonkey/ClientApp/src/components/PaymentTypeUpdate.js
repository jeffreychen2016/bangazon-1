import React from 'react';
import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';
import { Glyphicon } from 'react-bootstrap';

export class PaymentTypeUpdate extends React.Component {

    state = {
        paymentTypes: [],
        paymentType: {
            paymentTypeName: "",
            customerId: "",
        },
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

    editCancel = () => {
        this.componentDidMount;
    }

    clickOnEdit = (index) => {
        const temporaryPaymentTypes = [...this.state.paymentTypes];
        temporaryPaymentTypes[index].displayEdit = index;
        this.setState({ paymentTypes: temporaryPaymentTypes});
    }

    editPaymentType = (e) => {
        paymentTypeCalls
            .updatePaymentType(e.target.id, this.state.paymentType)
            .then(() => {
                this.componentDidMount() {
                    paymentTypes.forEach(paymentType => {
                        paymentType.displayEdit = '';
                    })
                };
            })
            .catch((error) => {
                console.error('error with edit paymenttype', error);
            })
    }

    render() {
        const { paymentType } = this.state;
        return (
            <div>
                <button
                    className="btn btn-warning"
                    id={this.props.id}
                    onClick={}
                >
                    <Glyphicon glyph="pencil" />
                </button>
            </div>
        )
    }
}