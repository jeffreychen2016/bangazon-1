import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/product/products`)
            .then(results => {
                const products = [];
                if (results.data !== null) {
                    Object.keys(results.data).forEach(pkey => {
                        results.data[pkey].id = pkey;
                        products.push(results.data[pkey]);
                    });
                }
                resolve(products);
            })
            .catch(error => {
                reject(error);
            });
    });
};


export default { getRequest };
