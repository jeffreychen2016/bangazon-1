import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/product/products`)
            .then(results => {
                resolve(results.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const deleteRequest = (productId) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/product/deleteproduct/${productId}`)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


export default {
    getRequest,
    deleteRequest
};
