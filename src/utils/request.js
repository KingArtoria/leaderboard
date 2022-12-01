import axios from 'axios';
const service = axios.create({
  baseURL: 'https://nad.bdhuoke.com/admin',
  // baseURL: 'http://39.103.195.49/web',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});
service.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.resolve(error.response);
  },
);
export default service;