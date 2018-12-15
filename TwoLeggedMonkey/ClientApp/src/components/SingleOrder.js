import React, { Component } from 'react';
import orderRequests from '../DBRequests/orderRequest';
import { Button, Glyphicon } from 'react-bootstrap';

export class SingleOrder extends Component {

    state =
    {
        orders: [],
    }

    componentDidMount ()
    {
        const orderId = this.props.match.params.id;
        orderRequests.getOrderById(orderId)
        .then((res) =>
        {
            this.setState({orders: res});
        })
        .catch((err) =>
        {
            console.error(err)
        })
    }

    CheckboxTrue = (props) => {
    return <input type="checkbox" defaultChecked />;
    }

    CheckboxFalse = (props) => {
    return <input type="checkbox"/>;
    }

    render ()
    {
        const singleOrder = this.state.orders.map((order) =>
        {
            let checkbox;

            if (order.isActive) {
            checkbox = <this.CheckboxTrue />
            }
            else {
            checkbox = <this.CheckboxFalse />
            }

            return (
                <tr key = {order.id}>
                    <td className={order.edit}>{order.id}</td>
                    <td>{order.customerId}</td>
                    {order.isComplete === true ? <td>{checkbox}</td> : <td>{checkbox}</td>}
                    {order.isActive === true ? <td>{checkbox}</td> : <td>{checkbox}</td>}
                    <td><button className="btn btn-default" onClick={singleOrder} id={order.id}><Glyphicon glyph="floppy-save" /></button></td>
                </tr>
              );
          });
        return(
            <div>
            <table className="table">
              <tbody>
                <tr>
                  <th>Order Number</th>
                  <th>Customer Id</th>
                  <th>Completion Status</th>
                  <th>Active Status</th>
                </tr>
                {singleOrder}
              </tbody>
            </table>
          </div>
        )
    }

}
