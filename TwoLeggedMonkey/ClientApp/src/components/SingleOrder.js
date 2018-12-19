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
    return <input onClick={this.isActiveChange} type="checkbox" defaultChecked />;
    }

    CheckboxFalse = (props) => {
    return <input onClick={this.isActiveChange} type="checkbox"/>;
    }

    CheckboxTrue2 = (props) => {
        return <input onClick={this.isCompleteChange} type="checkbox" defaultChecked />;
    }

    CheckboxFalse2 = (props) => {
        return <input onClick={this.isCompleteChange} type="checkbox"/>;
    }

    changeCustomerId = (e) =>
    {
        const field = 'customerId';
        const tempOrder = {...this.state.orders};
        tempOrder[0][field] = (e.target.value * 1)
        this.setState({updatedOrder: tempOrder})
    }

    isActiveChange = (e) =>
    {
        const field = "isActive";
        const tempOrder = {...this.state.orders}
        if (tempOrder[0][field])
        {
            tempOrder[0][field] = false
        }
        else
        {
            tempOrder[0][field] = true;
        }
        this.setState({updatedOrder: tempOrder});
    }

    isCompleteChange = (e) =>
    {
        const field = "isComplete";
        const tempOrder = {...this.state.orders}
        if (tempOrder[0][field])
        {
            tempOrder[0][field] = false
        }
        else
        {
            tempOrder[0][field] = true;
        }
        this.setState({updatedOrder: tempOrder});
    }

    updateChangedOrder = () =>
    {
        const updatedOrder = this.state.orders[0];
        const id = this.state.orders[0].id;
        orderRequests.updateOrder(id, updatedOrder)
        .then(() =>
        {
            this.props.history.push(`/order`);
        })
        .catch((err) =>
        {
            console.error(err);
        })
    }

    render ()
    {
        const singleOrder = this.state.orders.map((order) =>
        {
            let checkbox;
            let checkbox2;

            if (order.isActive === true) {
            checkbox = <this.CheckboxTrue />
            }
            else {
            checkbox = <this.CheckboxFalse />
            }

            if(order.isComplete === true)
            {
                checkbox2 = <this.CheckboxTrue2 />
            }
            else
            {
                checkbox2 = <this.CheckboxFalse2 />
            }

            return (
                <tr key = {order.id}>
                    <td>{order.id}</td>
                    <td><input onChange={this.changeCustomerId} value={order.customerId}/></td>
                    {order.isComplete === true ? <td>{checkbox2}</td> : <td>{checkbox2}</td>}
                    {order.isActive === true ? <td>{checkbox}</td> : <td>{checkbox}</td>}
                    <td><button className="btn btn-default" onClick={this.updateChangedOrder} id={order.id}><Glyphicon glyph="floppy-save" /></button></td>
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
