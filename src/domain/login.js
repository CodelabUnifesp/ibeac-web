import api from '../services/api';

export default function login({username, password} = {}) {
  return api.post(
    `login?aud=${process.env.REACT_APP_ME ?? 'plasmedis-web-local'}`,
    {username, password},
  );
}

/**
 * Retorna uma lista de informações sobre o protocolo de login da api
 */
export async function get() {
  try {
    const response = await api.get('login');
    return response.data ?? {};
  } catch {
    return null;
  }
}
