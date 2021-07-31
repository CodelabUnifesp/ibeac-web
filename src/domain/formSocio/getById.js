import api from '../../services/api';

export default async function getById(userId, token) {
  try {
    debugger;
    const response = await api.get(`/form_socio/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users[0];
  } catch (e) {
    alert('Erro ao encontar informações');
    return null;
  }
}
