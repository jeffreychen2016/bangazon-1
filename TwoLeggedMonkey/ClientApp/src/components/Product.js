import React, { Component } from 'react';
import productRequest from '../DBRequests/productRequest';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

const baseProduct =
{
    name: '',
    quantity: 0,
    description: '',
    price: 0,
    productTypeId: 0
};


export class Product extends Component {


    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        products: [],
        show: false,
        newProduct: baseProduct,
        productType: []
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

    postProduct = (e) => {
        e.preventDefault();
        productRequest.postRequest(this.state.newProduct);
        this.handleClose();
        this.componentDidMount();
    }

    productState = (name, e) => {
        const tempProduct = { ...this.state.newProduct };
        tempProduct[name] = e.target.value;
        this.setState({ newProduct: tempProduct });
    }

    nameCreate = (e) => {
        this.productState("name", e);
    }

    quantityCreate = (e) => {
        this.productState("quantity", e);
    }

    descriptionCreate = (e) => {
        this.productState("description", e);
    }

    priceCreate = (e) => {
        this.productState("price", e);
    }

    productTypeIdCreate = (e) => {
        this.productState("productTypeId", e);
    }

    editClick = (index) => {
        const tempProducts = [...this.state.products];
        tempProducts[index].showEdit = index;
        this.setState({ products: tempProducts });
    }

    cancelEdit = () => {
        this.componentDidMount();
    }

    submitEdit = (e) => {
        e.preventDefault();
        productRequest.putRequest(e.target.id, this.state.newProduct)
            .then(() => {
                this.componentDidMount();
            });
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

    //printProductTypes = () => {
    //    productRequest.getProductType()
    //        .then((productTypes) => {
    //            this.state.productType(productTypes);
    //            const pts = this.state.productType;
    //            if (pts.length) {
    //                return pts.map((productType) => {
    //                    return (<option value={productType.id} key={productType.id}>{productType.productTypeName}</option>);
    //                });
    //            }
    //        })
    //        .catch((err) => {
    //            console.error('Error with productType: ', err);
    //        });
    //};

    handleClose() {
        this.setState({ show: false });
        this.componentDidMount();
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const productComponenet = this.state.products.map((product, index) => {
            if (product.showEdit === '') {
                return (
                    <tr key={product.id}>
                        <td className={product.showEdit}>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.productTypeId}</td>
                        <td className="btn btn-default" id={product.id} onClick={() => { this.editClick(index); }}><Glyphicon glyph="pencil" /></td>
                        <td className="btn btn-danger" id={product.id} onClick={this.deleteClick}><Glyphicon glyph="trash" /></td>
                    </tr>
                );
            } else {
                return (
                    <tr key={product.id}>
                        <td><input type="text" className="form-control" placeholder="Name" aria-describedby="basic-addon1" onChange={this.nameCreate} /></td>
                        <td><input type="text" className="form-control" placeholder="Quantity" aria-describedby="basic-addon1" onChange={this.quantityCreate} /></td>
                        <td><input type="text" className="form-control" placeholder="Description" aria-describedby="basic-addon1" onChange={this.descriptionCreate} /></td>
                        <td><input type="text" className="form-control" placeholder="Price" aria-describedby="basic-addon1" onChange={this.priceCreate} /></td>
                        <td><input type="text" className="form-control" placeholder="Product Type Id" aria-describedby="basic-addon1" onChange={this.productTypeIdCreate} /></td>
                        <td className="btn btn-default" id={product.id} onClick={this.submitEdit}><Glyphicon glyph="floppy-save" /></td>
                        <td className="btn btn-info" id={product.id} onClick={this.cancelEdit}>Cancel</td>
                    </tr>
                );
            }
        });
    return (
      <div>
            <h1>Product</h1>
                <button onClick={this.handleShow}>Add New Product</button>
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

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>New Order</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input placeholder="Name" onChange={this.nameCreate} />
                    <input placeholder="Quantity" onChange={this.quantityCreate} />
                    <input placeholder="Description" onChange={this.descriptionCreate} />
                    <input placeholder="Price" onChange={this.priceCreate} />
                    <input placeholder="ProductType Id" onChange={this.productTypeIdCreate} />
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button bsStyle="primary" onClick={this.postProduct}>Save changes</Button>
                </Modal.Footer>
            </Modal>
      </div>
    );
  }
}

export default Product;
