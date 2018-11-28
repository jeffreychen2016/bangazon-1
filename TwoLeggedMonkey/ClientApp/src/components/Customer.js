import React, { Component } from 'react';
import customersRequest from '../DBRequests/customers';

export class Customer extends Component {
    state = {
        customers: []
    }

    componentDidMount() {
        customersRequest
            .getRequest()
            .then((customers) => {
                this.setState({ customers });
            })
            .catch(err => {
                console.error('Error with customers get request', err);
            })
    }

    render() {
        const customerComponents = this.state.customers.map((customer) => {
            return (
                <div key={customer.id}>
                    <h3>{customer.firstName} {customer.lastName}</h3>
                </div>
            );
        });
    return (
      <div>
            <h1>Customers</h1>
            <ul>
                {customerComponents}
            </ul>
       </div>
    );
  }
}

export default Customer;