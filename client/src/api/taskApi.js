import axios from "axios";

const API = axios.create({
  baseURL: "https://focusflow-lqx7.onrender.com/api",
});

export default API;