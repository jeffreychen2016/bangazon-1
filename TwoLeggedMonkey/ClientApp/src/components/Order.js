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
        <h2>{order.id}</h2>
        <h2>{order.customerId}</h2>
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
