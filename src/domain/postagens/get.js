import {get, has, isEmpty, isNil, isString} from 'lodash';
import moment from 'moment';

import api from '../../services/api';

// eslint-disable-next-line func-names
export default async function (token, id) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  if (isNil(id) || (isEmpty(id) && isString(id)))
    throw new Error('Id da postagem não foi informado');

  const post = await api.get(`/postagens/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!has(post, 'data')) return null;

  return {
    id: get(post, 'data.id'),
    title: get(post, 'data.titulo'),
    description: get(post, 'data.texto'),
    category: {
      id: get(post, 'data.categoria'),
      name: '<API NÃO ESTÁ ENVIANDO>',
    },
    neighborhood: {
      id: '<API NÃO ESTÁ ENVIANDO>',
      name: '<API NÃO ESTÁ ENVIANDO>',
    },
    author: {
      id: get(post, 'data.criador.id'),
      name: get(post, 'data.criador.name'),
      avatar: '<API NÃO ESTÁ ENVIANDO>',
    },
    dateTime: moment(`${get(post, 'data.data')}Z`),
    verified: get(post, 'data.selo'),
    comments: get(post, 'data.comentarios', []).map((comentario) => ({
      id: '<API NÃO ESTÁ ENVIANDO>',
      author: {
        id: get(comentario, 'criador.id'),
        name: get(comentario, 'criador.name'),
        avatar: '<API NÃO ESTÁ ENVIANDO>',
      },
      post: get(comentario, 'postagem'),
      dateTime: moment(`${get(comentario, 'data')}Z`),
      body: get(comentario, 'texto'),
    })),
  };
}
