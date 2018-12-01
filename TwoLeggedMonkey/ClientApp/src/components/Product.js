import React, { Component } from 'react';
import productRequest from '../DBRequests/productRequest';

export class Product extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        productRequest.getRequest()
            .then((products) => {
                products.forEach(product => {
                    product.showEdit = '';
                });
                this.setState({ products });
            })
            .catch(err => {
                console.error('Error with product getRequest', err);
            });
    }

    editClick = (e) => {
        const tempProducts = [...this.state.products];
        tempProducts[0].showEdit = e.target.id;
        this.setState({ products: tempProducts });
    }

    cancelEdit = () => {
        this.componentDidMount();
    }

    deleteClick = (e) => {
        const productToDelete = e.target.id;
        productRequest
            .deleteRequest(productToDelete)
            .then(() => {
                this.componentDidMount();
            })
            .catch((err) => {
                console.error('error with delete request', err);
            });
    }

    render() {
        const productComponenet = this.state.products.map((product) => {
            if (product.showEdit === '') {
                return (
                    <tr key={product.id}>
                        <td className={product.showEdit}>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.productTypeId}</td>
                        <td className="btn btn-success" id={product.id} onClick={this.editClick}>Edit</td>
                        <td className="btn btn-danger" id={product.id} onClick={this.deleteClick}>Delete</td>
                    </tr>
                );
            } else {
                return (
                    <tr key={product.id}>
                        <td><input type="text" className="form-control" placeholder="Name" aria-describedby="basic-addon1" /></td>
                        <td><input type="text" className="form-control" placeholder="Quantity" aria-describedby="basic-addon1" /></td>
                        <td><input type="text" className="form-control" placeholder="Description" aria-describedby="basic-addon1" /></td>
                        <td><input type="text" className="form-control" placeholder="Price" aria-describedby="basic-addon1" /></td>
                        <td><input type="text" className="form-control" placeholder="Product Type Id" aria-describedby="basic-addon1" /></td>
                        <td className="btn btn-success" id={product.id} onClick={this.submitEdit}>Submit Changes</td>
                        <td className="btn btn-info" id={product.id} onClick={this.cancelEdit}>Cancel</td>
                    </tr>
                );
            }
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
                            <th>Product Type ID</th>
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
