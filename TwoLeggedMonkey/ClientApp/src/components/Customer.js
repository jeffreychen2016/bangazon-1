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
                <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>ACTIVE</td>
                </tr>
            );
        });
    return (
      <div>
            <h1>Customers</h1>

            <table>
                <tbody>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Active</th>
                </tr>
                    {customerComponents}
                </tbody>
            </table>
       </div>
    );
  }
}

export default Customer;