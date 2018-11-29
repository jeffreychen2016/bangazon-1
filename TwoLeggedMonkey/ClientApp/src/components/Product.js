import React, { Component } from 'react';
import productRequest from '../DBRequests/productRequest';

export class Product extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        productRequest.getRequest()
            .then((products) => {
                this.setState({ products });
            })
            .catch(err => {
                console.error('Error with product getRequest', err);
            });
    }

    render() {
        const productComponenet = this.state.products.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                </tr>
            );
        });
    return (
      <div>
            <h1>Product</h1>
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                            {productComponenet}
                    </tbody>
                </table>
            </div>
      </div>
    );
  }
}

export default Product;
