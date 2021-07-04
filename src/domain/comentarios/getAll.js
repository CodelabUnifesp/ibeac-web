import {get, has} from 'lodash';

import api from '../../services/api';

export default async function getAll() {
  const comentarios = await api.get('comentarios');

  if (!has(comentarios, 'data')) return null;

  return get(comentarios, 'data.comments').map((comentario) => ({
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
