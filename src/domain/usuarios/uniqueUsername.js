import api from '../../services/api';
import encodeDate from '../../utils/encodeDate';

export default function uniqueUsername(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'b') {
        return reject(
          new Error('Erro ao verificar disponibilidade do nome do usuário'),
        );
      }

      return resolve({username, unique: username !== 'a'});
    }, 1000);
  });
}
