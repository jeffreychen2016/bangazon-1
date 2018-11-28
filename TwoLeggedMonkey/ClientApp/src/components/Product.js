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
                <div key={product.id}>
                    <h3>{product.name}</h3>
                </div>
            );
        });
    return (
      <div>
            <h1>Product</h1>
            <h2>{productComponenet}</h2>
      </div>
    );
  }
}

export default Product;
