import {get, has} from 'lodash';

import api from '../../services/api';

export default async function getAll() {
  const categorias = await api.get('categorias');

  if (!has(categorias, 'data')) return null;

  return get(categorias, 'data.Categorias').map((categoria) => ({
    id: get(categoria, 'id'),
    name: get(categoria, 'nome'),
  }));
}
