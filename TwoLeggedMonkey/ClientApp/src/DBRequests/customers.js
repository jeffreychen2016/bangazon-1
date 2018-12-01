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

const deleteRequest = () => {
    return new Promise((resolve, reject) => {

    })
}

export default { getRequest, deleteRequest };