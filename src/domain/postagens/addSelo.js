import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function addSelo(token, postagemId) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  try {
    return api
      .put(`selo/${postagemId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return true;
      });
  } catch (e) {
    return false;
  }
}
