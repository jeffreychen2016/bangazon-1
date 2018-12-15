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

const getEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Employee/Employee/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getFilteredEmployees = (firstName,lastName,departmentId,employeeTypeId,assignedComputer) => {
  return new Promise((resolve, reject) => {
    let URL = `/api/Employee/getFilteredEmployees?`;
    const paramArray = [{'_firstName':firstName},{'_lastName':lastName},{'_departmentId':departmentId},{'_employeeTypeId':employeeTypeId},{'_assignedComputer':assignedComputer}];
    const paramForURL = [];
    paramArray.filter(param => {
      // console.error('key:',Object.keys(param)[0]);
      // console.error('value:',param[Object.keys(param)[0]]);
      if (param[Object.keys(param)[0]] !== null) {
        paramForURL.push(param);
      }
    });

    paramForURL.forEach(param => {
      // console.error('test',Object.keys(param)[0]);
      // console.error('test2',param[Object.keys(param)[0]]);
      URL += `${Object.keys(param)[0]}=${param[Object.keys(param)[0]]}`;
    })
    console.error('URL',URL);
    axios
      // .get(`/api/Employee/getFilteredEmployees?_firstName=${firstName}&_lastName=${lastName}&_departmentId=${departmentId}&_employeeTypeId=${employeeTypeId}&_assignedComputer=${assignedComputer}`)
      .get(URL)
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
      .delete(`/api/Employee/deleteemployee/${id}`)
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
      .post(`/api/Employee`,newEmployee)
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

export default { getAllEmployees,deleteEmployee,addEmployee,updateEmployee,getEmployeeById,getFilteredEmployees };

