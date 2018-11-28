import axios from 'axios';

const getAllOrdersRequest = () =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .get(`/api/order`)
      .then(res =>
        {
          const orderHolder = [];
          if (res.data !== null)
          {
            Object.keys(res.data).forEach(oKey =>
              {
                res.data[oKey].id = oKey;
                orderHolder.push(res.data[oKey])
              })
          }
          resolve(res.data);
        })
        .catch(err =>
        {
          reject(err);
        });
  });
};

const postNewOrder = (order) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .post(`/api/order`, order)
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

const deleteOrder = (id) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .delete(`/api/order/deleteOrder/${id}`)
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


export default {getAllOrdersRequest, postNewOrder}