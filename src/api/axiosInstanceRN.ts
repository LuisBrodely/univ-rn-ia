import axios from 'axios';

const axiosInstanceRN = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_RN}:8000/api/v1`,
});

export default axiosInstanceRN;