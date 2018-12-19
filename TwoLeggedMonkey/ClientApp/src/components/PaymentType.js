import React, { Component } from 'react';
import { PaymentTypeDelete } from './PaymentTypeDelete';
import { PaymentTypePost } from './PaymentTypePost';
import { Glyphicon } from 'react-bootstrap';

import paymentTypeCalls from '../DBRequests/PaymentTypeCalls';

export class PaymentType extends Component {

    state = {
        allPaymentTypes: [], 
        newPaymentType: {
            paymentTypeName: "",
            customerId: "",
        }
    }

    getPaymentTypes = () => {
        paymentTypeCalls
            .getAllPaymentTypes()
            .then((allPaymentTypes) => {
                allPaymentTypes.forEach(paymentType => {
                    paymentType.displayEdit = '';
                })
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

    clickOnEdit = (index) => {
        const temporaryPaymentTypes = [...this.state.allPaymentTypes];
        temporaryPaymentTypes[index].displayEdit = index;
        this.setState({ paymentTypes: temporaryPaymentTypes });
    }

    editPaymentType = (e) => {
        e.preventDefault();
        paymentTypeCalls
            .updatePaymentType(e.target.id, this.state.paymentType);
                this.componentDidMount();
    }

    render() {
        const paymentTypes = this.state.allPaymentTypes.map((paymentType, index) => {
            if (paymentType.displayEdit === '') {
                return (
                    <tr key={paymentType.id}>
                        <td>
                            {paymentType.id}
                        </td>
                        <td>
                            {paymentType.paymentTypeName}
                        </td>
                        <td>
                            {paymentType.customerId}
                        </td>
                        <td>
                            <button
                                className="btn btn-warning"
                                id={paymentType.id}
                                onClick={() => { this.clickOnEdit(index); }}
                            >
                                <Glyphicon glyph="pencil" />
                            </button>
                        </td>
                        <td>
                            <PaymentTypeDelete
                                paymentTypeId={paymentType.id}
                            />
                        </td>
                    </tr>
                );
            } else {
                return (
                    <tr key={paymentType.id}>
                        <td>
                            {paymentType.id}
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                id={paymentType.paymentTypeName}
                                placeholder={paymentType.paymentTypeName}
                                onChange={this.paymentTypeNameChanged}
                            />
                        </td>
                        <td>
                            <input
                                type="text" 
                                className="form-control"
                                placeholder={paymentType.customerId}
                                id={paymentType.customerId}
                                onChange={this.customerIdChanged}
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-warning"
                                id={paymentType.id}
                                paymentTypeName={paymentType.id}
                                onClick={this.editPaymentType}
                            >
                                <Glyphicon glyph="floppy-save" />
                            </button>
                            
                        </td>
                        <td>
                            <PaymentTypeDelete
                                paymentTypeId={paymentType.id}
                            />
                        </td>
                    </tr>
                );
            }

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

