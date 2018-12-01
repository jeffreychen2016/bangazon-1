import React, { Component } from 'react';
import orderRequests from '../DBRequests/orderRequest';
import { Modal, Button } from 'react-bootstrap';

const plainOrder =
{
  customerId: 0,
  isComplete: true,
  isActive: false,
}

export class Order extends Component {

  state =
  {
    orders: [],
    show: false,
    newOrder: plainOrder,
    editing: 0
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

  deleteOrderClick = (e) =>
  {
    const orderId = e.target.id;
    orderRequests
    .deleteOrder(orderId)
    .then(() =>
    {
      this.componentDidMount();
    })
    .catch((err) =>
    {
      console.error(err);
    });
  };

  updateOrder = () =>
  {
    return new Promise((resolve, reject) =>
    {
      orderRequests.updateOrder(this.state.id, this.state)
      .then(res =>
        {
          this.setState({editing: 0});
          resolve(res);
        })
        .catch((err) =>
        {
          reject(err);
        });
    });
  };

  postOrder = (e) =>
  {
    e.preventDefault();
    orderRequests.postNewOrder(this.state.newOrder);
    this.handleClose();
    this.componentDidMount();
  }

  orderState = (name, e) =>
  {
    const tempOrder = {...this.state.newOrder};
    tempOrder[name] = e.target.value;
    this.setState({newOrder : tempOrder});
  }

  orderBoolState = (name, e) =>
  {
    const tempOrder = {...this.state.newOrder};
    tempOrder[name] = (e.target.value === "true");
    this.setState({newOrder : tempOrder});
  }

  customerIdCreate = (e) =>
  {
    this.orderState("customerId", e);
  }

  isCompleteCreate = (e) =>
  {
    this.orderBoolState("isComplete", e);
  }

  isActiveCreate = (e) =>
  {
    this.orderBoolState("isActive", e);
  }

  constructor (props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.setState({ show: false });
  }

  handleShow () {
    this.setState({ show: true });
  }

  render() {
    const myOrders = this.state.orders.map((order) =>
  {
    if(!this.state.editing)
    {
      return (
        <tr key = {order.id}>
          <td>{order.id}</td>
          <td>{order.customerId}</td>
          {order.isComplete === true ? <td>Complete</td> : <td>Not Complete</td>}
          {order.isActive === true ? <td>Active</td> : <td>Not Active</td>}
          <td><button onClick={this.deleteOrderClick} id={order.id}>X</button></td>
          <td><button onClick={() => this.setState({isEditing: 1})} id={order.id}>Update</button></td>
        </tr>
      );
    }
    else
    {
      return (
        <tr key = {order.id}>
          <td>{order.id}</td>
          <td><input placeholder={order.customerId}/></td>
          {order.isComplete === true ? <td><input placeholder="Complete"/></td> : <td><input placeholder="Not Complete"/></td>}
          {order.isActive === true ? <td><input placeholder="Active"/></td> : <td><input placeholder="Not Active"/></td>}
          <td><button onClick={this.deleteOrderClick} id={order.id}>X</button></td>
          <td><button onClick={this.updateOrder} id={order.id}>Save</button></td>
        </tr>
      );
    }

  });
  return (
    <div>
      <h1>Orders</h1>
      <button onClick={this.handleShow}>Post</button>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Customer Id</th>
              <th>Completion Status</th>
              <th>Active Status</th>
            </tr>
            {myOrders}
          </tbody>
        </table>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>New Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input placeholder="Customer Id" onChange={this.customerIdCreate}/>
            <input placeholder="Completeion Status" onChange={this.isCompleteCreate}/>
            <input placeholder="Active Status" onChange={this.isActiveCreate}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.postOrder}>Save changes</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
}
