import axios from 'axios';

const getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/Department/depts`)
        .then(results => {
            resolve(results.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

const getDeptEmployees = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/Department/${id}`)
        .then(results => {
            resolve(results.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default { getAllDepartments, getDeptEmployees };
