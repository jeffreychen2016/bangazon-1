import React, { Component } from 'react';
import orderRequests from '../DBRequests/orderRequest';


export class Order extends Component {

  state =
  {
    orders: [],
  }

  componentDidMount ()
  {
    orderRequests
    .getAllOrdersRequest()
    .then((orders) =>
    {
      this.setState({orders});
    })
    .catch((err) =>
    {
      console.error(err)
    });
  }

  render() {
    const myOrders = this.state.orders.map((order) =>
  {
    return (
      <div key = {order.id}>
        <h1>Order</h1>
        <p>{order.id}</p>
        <p>{order.customerId}</p>
        {order.isComplete === true ? <p>Complete</p> : <p>Not Complete</p>}
        {order.isActive === true ? <p>Active</p> : <p>Not Active</p>}
      </div>
    );
  });
  return (
    <div>
      <h1>Orders</h1>
      {myOrders}
    </div>
  )
}
}
