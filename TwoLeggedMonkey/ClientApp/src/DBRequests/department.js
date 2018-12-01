import axios from 'axios';

const getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Department/depts`)
      .then(res => {
        const departments = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(pkey => {
            res.data[pkey].id = pkey;
            departments.push(res.data[pkey]);
          });
        }
        resolve(departments);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getAllDepartments };
