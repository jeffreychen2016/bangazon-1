import axios from 'axios';

const getAllEmployeeTypes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/EmployeeType/GetAllEmployeeType`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getAllEmployeeTypes };
