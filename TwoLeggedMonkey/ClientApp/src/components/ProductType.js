//import React, { Component } from 'react';
//import productRequest from '../DBRequests/productRequest';

//export class ProductType extends Component {

//    componentDidMount = () => {
//        productRequest.getProductType()
//            .then((productTypes) => {
//                this.props.productType(productTypes);
//            })
//            .catch((err) => {
//                console.error('Error adding an deparments: ', err);
//            });
//    };

//    printProductTypes = () => {
//        productRequest.getProductType()
//            .then((productTypes) => {
//                this.state.productType(productTypes);
//                const pts = this.state.productType;
//                if (pts.length) {
//                    return pts.map((productType) => {
//                        return (<option value={productType.id} key={productType.id}>{productType.productTypeName}</option>);
//                    });
//                }
//            })
//            .catch((err) => {
//                console.error('Error adding an deparments: ', err);
//            });
//    };

//    render() {
//        return (
//            <select onChange={this.props.productTypeChange}>
//                <option value="Choose here">Choose here</option>
//                {this.printProductTypes()}
//            </select>
//        );
//    }
//}