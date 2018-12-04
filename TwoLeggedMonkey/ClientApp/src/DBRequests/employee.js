import axios from 'axios';

const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Employee/employees`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteEmployee = (id) => {
  return new Promise((resolve,reject) => {
    axios
      .delete(`/api/Employee/DeleteEmployee/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addEmployee = (newEmployee) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`/api/Employee/AddEmployee`,newEmployee)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateEmployee = (EmployeeId, updatedEmployee) => {
  return new Promise((resolve,reject) => {
    axios
      .put(`/api/Employee/UpdateEmployee/${EmployeeId}`,updatedEmployee)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getAllEmployees,deleteEmployee,addEmployee,updateEmployee };

