import {get, has} from 'lodash';

import api from '../../services/api';

export default async function getAll() {
  const bairros = await api.get('bairros', {
    headers: {
      Authorization:
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjowLjIsImV4cCI6MTY1ODIxNzAzNywiaWF0IjoxNjI2NjgxMDM3LCJzdWIiOjEsImlzcyI6InBsYXNtZWRpcy1hcGktbG9jYWwiLCJhdWQiOiJwb3N0bWFuIn0.HbwiBP6AexzaOJ-eN7PVymSuWM6HOr_iB56D7Pcgzvw',
    },
  }); // HACK: esse header com token fixo é para acomodar a atualizacao da API, vai ser removido com o merge do pr #96

  if (!has(bairros, 'data')) return null;

  return get(bairros, 'data.Bairros').map((bairro) => ({
    id: get(bairro, 'id'),
    name: get(bairro, 'nome'),
  }));
}
