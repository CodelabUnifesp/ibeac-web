import api from '../services/api';

export default function login({email, password} = {}) {
  return api.post('login', {email, password});
}
