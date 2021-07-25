import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function create(
  token,
  newComentario,
  currentUserId,
  postagemId,
) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  const objToSend = {
    texto: newComentario,
    criador: currentUserId,
    postagem: postagemId,
    resposta: null,
  };

  try {
    await api
      .post('comentarios', objToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      });
  } catch (e) {
    alert(
      'Ocorreu um erro ao adicionar o comentário. Verifique com o administrador',
    );
  }
}
