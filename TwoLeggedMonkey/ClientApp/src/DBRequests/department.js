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
            .get(`/api/Department/${id}?_include=employees`)
        .then(results => {
            resolve(results.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

const postNewDepartment = (dept) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .post(`/api/department`, dept)
      .then((res) =>
      {
        resolve(res);
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};


const putRequest = (departmentId, updatedDepartment) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`api/department/updatedept/${departmentId}`, updatedDepartment)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default { getAllDepartments, getDeptEmployees, postNewDepartment, putRequest };

