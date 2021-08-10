import axios from "axios";
const baseUrl = "https://macrolator.herokuapp.com/api/fetch/";
//const baseUrl = "http://localhost:5000/api/fetch/";

const get = (toSearch) => {
  return axios.get(`${baseUrl}${toSearch}`);
};
// eslint-disable-next-line
export default { get };
