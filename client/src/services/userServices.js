import axios from "axios";
const baseUrl = "https://macrolator.herokuapp.com/api/";
//const baseUrl = "http://localhost:5000/api/";

const login = (user) => {
  console.log(user);
  return axios.post(`${baseUrl}auth`, user);
};

const register = (newUser) => {
  return axios.post(`${baseUrl}users/add`, newUser);
};
// eslint-disable-next-line
export default { login, register };
