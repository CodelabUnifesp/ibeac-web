import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function addSelo(token, postagemId) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  try {
    await api
      .put(`selo/${postagemId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      });
  } catch (e) {
    alert(
      'Ocorreu um erro ao verificar a postagem. Verifique com o administrador',
    );
  }
}
