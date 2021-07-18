import api from '../../services/api';
import encodeDate from '../../utils/encodeDate';

export default function uniqueUsername(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'erro_ao_verificar') {
        return reject(
          new Error('Erro ao verificar disponibilidade do nome do usuário'),
        );
      }

      return resolve({username, unique: username !== 'nao_unico'});
    }, 1000);
  });
}
