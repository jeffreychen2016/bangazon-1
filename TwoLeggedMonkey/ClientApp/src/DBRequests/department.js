import axios from 'axios';

const getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Department/depts`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getAllDepartments };
