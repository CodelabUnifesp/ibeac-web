import api from '../services/api';

export default function login({username, password} = {}) {
  return api.post('login', {username, password}); // HACK: troquei email por username para acomodar a atualizacao da API, vai ser removido com o merge do pr #96
}
