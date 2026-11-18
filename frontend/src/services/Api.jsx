import axios from "axios"
const API = axios.create({
  baseURL: "https://shopkart-yygw.onrender.com",
  //  "http://localhost:5001",
  withCredentials: true
})
export default API