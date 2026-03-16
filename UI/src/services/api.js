import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7176/api"
});

export default API;