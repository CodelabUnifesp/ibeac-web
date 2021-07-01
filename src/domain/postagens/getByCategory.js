import {get, has, isNull} from 'lodash';

import api from '../../services/api';

export default async function getByCategory(category) {
  if (isNull(category)) return [];

  const posts = await api.get(`postagens/${category}`);

  if (!has(posts, 'data')) return null;

  return get(posts, 'data.post').map((post) => ({
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
    dateTime: '<API NAO ESTÁ ENVIANDO>',
    verified: get(post, 'selo'),
    comments: [], // '<API NAO ESTÁ ENVIANDO>'
  }));
}
