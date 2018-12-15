import axios from 'axios';

const getAllOrdersRequest = () =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .get(`/api/order`)
      .then(res =>
        {
          resolve(res.data);
        })
        .catch(err =>
        {
          reject(err);
        });
  });
};

const getOrderById = (id) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
    .get(`/api/order/${id}`)
    .then(res =>
      {
        resolve(res.data);
      })
      .catch(err =>
        {
          reject(err)
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

const updateOrder = (id, updatedOrder) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .put(`/api/order/updateOrder/${id}`, updatedOrder)
      .then((res) =>
      {
        resolve(res);
      })
      .catch((err) =>
      {
        reject(err)
      });
  });
};


export default {getAllOrdersRequest, postNewOrder, deleteOrder, updateOrder, getOrderById}