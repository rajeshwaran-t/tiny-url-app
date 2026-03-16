import axios from "axios";

const API = axios.create({
  baseURL: "https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/api"
});

export default API;