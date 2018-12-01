import axios from 'axios';

const getAllComputers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Computer/GetAllComputers`)
      .then(res => {
        // do not use this way, it will make the id start with 0
        // there is no id 0 id our tables
        
        // const computers = [];
        // if (res.data !== null) {
          // Object.keys(res.data).forEach(pkey => {
          //   res.data[pkey].id = pkey;
          //   computers.push(res.data[pkey]);
          // });
          // console.error(res.data);
          // console.error(computers);
        // }
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteComputer = (id) => {
  return new Promise((resolve,reject) => {
    axios
      .delete(`/api/Computer/DeleteComputer/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addComputer = (newComputer) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`/api/Computer/AddComputer`,newComputer)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateComputer = (computerId, updatedComputer) => {
  return new Promise((resolve,reject) => {
    axios
      .put(`/api/Computer/UpdateComputer/${computerId}`,updatedComputer)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getAllComputers,deleteComputer,addComputer,updateComputer };

