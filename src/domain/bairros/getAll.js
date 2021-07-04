import {get, has} from 'lodash';

import api from '../../services/api';

export default async function getAll() {
  const bairros = await api.get('bairros');

  if (!has(bairros, 'data')) return null;

  return get(bairros, 'data.Bairros').map((bairro) => ({
    id: get(bairro, 'id'),
    name: get(bairro, 'nome'),
  }));
}
