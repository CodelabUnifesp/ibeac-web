import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_PLASMEDIS_API ||
    'https://ibeac-plasmedis.herokuapp.com/',
});

export default api;
