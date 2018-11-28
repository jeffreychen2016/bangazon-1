import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/customer`)
            .then(results => {
                const customers = [];
                if (results.data !== null) {
                    Object.keys(results.data).forEach(ckey => {
                        results.data[ckey].id = ckey;
                        customers.push(results.data[ckey]);
                    });
                }
                resolve(customers);
            })
            .catch(error => {
                reject(error)
            })
    });
};

export default { getRequest };