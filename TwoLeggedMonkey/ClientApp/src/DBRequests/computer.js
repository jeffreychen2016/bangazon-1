import axios from 'axios';

const getAllComputers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Computer/GetAllComputers`)
      .then(res => {
        const computers = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(pkey => {
            res.data[pkey].id = pkey;
            computers.push(res.data[pkey]);
          });
        }
        resolve(computers);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getAllComputers };

