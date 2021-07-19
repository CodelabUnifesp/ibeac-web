import {get, has, isEmpty, isNil} from 'lodash';

import api from '../../services/api';

export default async function getAll(token) {
  const bairros = await api.get('bairros', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!has(bairros, 'data')) return null;

  return get(bairros, 'data.Bairros').map((bairro) => ({
    id: get(bairro, 'id'),
    name: get(bairro, 'nome'),
  }));
}
