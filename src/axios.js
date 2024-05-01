import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com' //import.meta.env.VITE_API_ENDPOINT
});

export default axiosInstance;
