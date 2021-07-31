import api from '../../services/api';

export default async function updateById(userId, token, objectToSend) {
  try {
    // nome_rep_familia=data['nome_rep_familia'],
    // pessoa=data['pessoa'],
    // qtd_pessoas_familia=data['qtd_pessoas_familia'],
    // pessoa_amamenta=data['pessoa_amamenta'],
    // qtd_criancas=data['qtd_criancas'],
    // gestante=data['gestante'],
    // qtd_amamentando=data['qtd_amamentando'],
    // qtd_criancas_deficiencia=data['qtd_criancas_deficiencia'],
    // qtd_gestantes=data['qtd_gestantes']
    debugger;

    if (objectToSend) {
      if (objectToSend[5] == 'Sim') {
        objectToSend[5] = true;
      } else if (objectToSend[5] == 'Não') {
        objectToSend[5] = false;
      }

      if (objectToSend[6] == 'Sim') {
        objectToSend[6] = true;
      } else if (objectToSend[6] == 'Não') {
        objectToSend[6] = false;
      }
    }

    const obj = {
      nome_rep_familia: objectToSend[1],
      qtd_pessoas_familia: objectToSend[2],
      qtd_criancas: objectToSend[3],
      qtd_gestantes: objectToSend[4],
      pessoa_amamenta: objectToSend[5],
      gestante: objectToSend[6],
      qtd_amamentando: objectToSend[7],
      qtd_criancas_deficiencia: objectToSend[8],
    };

    await api.post(`form_socio_by_user_id/${userId}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Informações Atualizadas!');
  } catch (e) {
    alert('Erro ao submeter informações');
  }
}
