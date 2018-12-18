import axios from 'axios';

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/paymenttype`)
            .then(res =>
            {
                resolve(res.data);
            })
            .catch(error =>
            {
                reject(error);
            });
    });
};

const postPaymentType = (paymentType) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/paymenttype/`, paymentType)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            })
        })  
    };

const deletePaymentType = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/paymenttype/delete/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            })
    })
};

const updatePaymentType = (id, paymentType) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/paymenttype/edit/${id}`, paymentType)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
};

export default { getAllPaymentTypes, deletePaymentType, postPaymentType, updatePaymentType }