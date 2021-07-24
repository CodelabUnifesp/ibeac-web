import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function getById(token, userId) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  try {
    const response = await api.get(`users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (e) {
    alert('Erro ao encontar informações');
    return null;
  }
}
