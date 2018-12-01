import React, { Component } from 'react';
import customersRequest from '../DBRequests/customers';

export class Customer extends Component {
    state = {
        customers: []
    }

    removeCustomer = (e) => {
        const customerToDelete = e.target.id;
        customersRequest
            .deleteRequest(customerToDelete)
            .then(() => {
                this.componentDidMount();
            })
            .catch((error) => {
                console.error("trouble making delete request ->", error);
            })
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
                    {customer.isActive === true ? <td>Active</td> : <td>Not Active</td>}
                    <td><button className="btn btn-default" id={customer.id} onClick={(e) => this.removeCustomer(e)}>delete</button></td>
                </tr>
            );
        });
    return (
      <div className="container">
            <h1>Customers</h1>

            <table className="table">
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