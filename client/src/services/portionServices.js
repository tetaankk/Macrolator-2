import axios from "axios";
const baseUrl = "https://macrolator.herokuapp.com/api/foods/";
//const baseUrl = "http://localhost:5000/api/foods/";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  return axios.get(`${baseUrl}`);
};

const get = (id) => {
  return axios.get(`${baseUrl}${id}`);
};

const create = (portionObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.post(baseUrl + "add", portionObject, config);
  return response.data;
};

const remove = (id) => {
  return axios.delete(`${baseUrl}${id}`);
};

const update = (id, foodObject) => {
  return axios.post(`${baseUrl}update/${id}`, foodObject);
};
// eslint-disable-next-line
export default { getAll, get, create, update, remove, setToken };
