import axios from 'axios';

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/paymenttype`)
            .then(res => {
                const allPaymentTypes = [];
                if (res.data !== null) {
                    Object.keys(res.data).forEach(ptKey => {
                        res.data[ptKey].id = ptKey;
                        allPaymentTypes.push(res.data[ptKey]);
                    });
                }
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default { getAllPaymentTypes }