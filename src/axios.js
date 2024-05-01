import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
