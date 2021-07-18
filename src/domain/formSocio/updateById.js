import api from '../../services/api';

export default async function updateById(userId, objectToSend) {
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
    const obj = {
      nome_rep_familia: objectToSend[1],
      pessoa: objectToSend[2],
      qtd_pessoas_familia: objectToSend[3],
      pessoa_amamenta: objectToSend[4],
      qtd_criancas: objectToSend[5],
      gestante: objectToSend[6],
      qtd_criancas_deficiencia: objectToSend[7],
      qtd_gestantes: objectToSend[8],
    };

    await api.put(`form_socio/${userId}`, obj);
    alert('Informações Atualizadas!');
  } catch (e) {
    alert('Erro ao submeter informações');
  }
}
