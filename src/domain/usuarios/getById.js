import api from '../../services/api';

export default async function getById(userId) {
  try {
    const response = await api.get(`users/${userId}`);
    return response.data.user;
  } catch (e) {
    alert('Erro ao encontar informações');
    return null;
  }
}
