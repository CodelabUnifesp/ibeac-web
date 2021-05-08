import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ibeac-plasmedis.herokuapp.com/',
});

export default api;
