import api from '../../services/api';

export default async function getById(userId) {
  try {
    debugger;
    const response = await api.get(`/form_socio/${userId}`);
    return response.data.user;
  } catch (e) {
    alert('Erro ao encontar informações');
    return null;
  }
}
