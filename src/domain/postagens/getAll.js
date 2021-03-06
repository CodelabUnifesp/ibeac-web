import {get, has, isEmpty, isNil} from 'lodash';
import moment from 'moment';
import stringify from '../../utils/stringify';

import api from '../../services/api';

export default async function getAll(
  token,
  {recommended = false, category = null, neighborhood = null} = {},
) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  let endpoint = `/${recommended ? 'recomendados' : 'postagens'}`;

  if (category) {
    endpoint += `/categorias/${category}`;
  }

  const posts = await api.get(
    `${endpoint}${stringify({
      bairro: neighborhood,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!has(posts, 'data')) return null;

  return get(posts, 'data.post', []).map((post) => ({
    id: get(post, 'id'),
    title: get(post, 'titulo'),
    description: get(post, 'texto'),
    category: {
      id: get(post, 'categoria'),
      name: '<API NÃO ESTÁ ENVIANDO>',
    },
    neighborhood: {
      id: get(post, 'bairro'),
      name: '<API NÃO ESTÁ ENVIANDO>',
    },
    author: {
      id: '<API NÃO ESTÁ ENVIANDO>',
      name: get(post, 'criador'),
      avatar: '<API NÃO ESTÁ ENVIANDO>',
    },
    dateTime: moment(`${get(post, 'data')}Z`),
    verified: get(post, 'selo'),
    comments: get(post, 'comentarios', 0),
  }));
}
