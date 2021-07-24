import {get, has, isEmpty, isNil} from 'lodash';

import api from '../../services/api';

export default async function getAll(token) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  const comentarios = await api.get('comentarios', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!has(comentarios, 'data')) return null;

  return get(comentarios, 'data.comments', []).map((comentario) => ({
    id: '<API NÃO ESTÁ ENVIANDO>',
    author: {
      id: get(comentario, 'criador'),
      name: '<API NÃO ESTÁ ENVIANDO>',
      avatar: '<API NÃO ESTÁ ENVIANDO>',
    },
    post: get(comentario, 'postagem'),
    dateTime: '<API NÃO ESTÁ ENVIANDO>',
    body: get(comentario, 'texto'),
  }));
}
