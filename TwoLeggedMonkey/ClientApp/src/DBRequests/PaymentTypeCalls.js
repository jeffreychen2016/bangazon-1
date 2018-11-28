import axios from 'axios';
import { PaymentType } from '../components/PaymentType';

const getAllPaymentTypes = () => {
    return new Promise((resoslve, reject) => {
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
                resolve(allPaymentTypes);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default { getAllPaymentTypes };