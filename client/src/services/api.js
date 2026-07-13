import axios from "axios";

const API = axios.create({
  baseURL: "https://college-notes-backend-pf0h.onrender.com/api",
});

export default API;