import {get, has, isEmpty, isNil} from 'lodash';

import api from '../../services/api';

export default async function getAll(token) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  const categorias = await api.get('categorias', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!has(categorias, 'data')) return null;

  return get(categorias, 'data.Categorias').map((categoria) => ({
    id: get(categoria, 'id'),
    name: get(categoria, 'nome'),
  }));
}
