import api from '../../services/api';
import encodeDate from '../../utils/encodeDate';

export default async function updateById(userId, objectToSend) {
  try {
    const obj = {
      nascimento: objectToSend[1],
      sexo: objectToSend[2],
      telefone: objectToSend[3],
      cor: objectToSend[4],
      rua: objectToSend[5],
      numero_casa: objectToSend[6],
    };

    obj.nascimento = encodeDate(obj.nascimento);
    obj.sexo = obj.sexo.charAt(0);

    await api.put(`users/${userId}`, obj);
    alert('Informações Atualizadas!');
  } catch (e) {
    alert('Erro ao submeter informações');
  }
}
