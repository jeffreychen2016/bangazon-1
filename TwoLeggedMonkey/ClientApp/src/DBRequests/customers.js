import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/customer`)
            .then(results => {
                resolve(results.data);
            })
            .catch(error => {
                reject(error)
            })
    });
};

const postRequest = (customer) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/customer/addcustomer`, customer)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
};

const deactivationRequest = (customerToDeactivateId) => {
    console.log(customerToDeactivateId);
    return new Promise((resolve, reject) => {
        axios
            .put(`api/customer/deactivate/${customerToDeactivateId}`)
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export default { getRequest, deactivationRequest, postRequest };