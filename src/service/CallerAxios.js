import axios from "axios";
import { serviceCount } from "./Service";

const Axios = axios.create({
   baseURL: 'https://isalo.shop/api'
});

Axios.interceptors.request.use(request => {
    // Set Authorization header
    request.headers['Authorization'] = 'Bearer '+localStorage.getItem('token');
  
    // Return the full request object
    return request;
}, error => {
    return Promise.reject(error); // Make sure to handle errors properly
});

export default Axios;
