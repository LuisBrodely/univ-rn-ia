import axios from 'axios';

const axiosInstanceCrud = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_CRUD}:8080/api/v1`,
});

export default axiosInstanceCrud;