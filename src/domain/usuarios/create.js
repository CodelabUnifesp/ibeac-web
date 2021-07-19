import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function create(token, newUser) {
  const {username, email, name, password, neighborhood, userType} = newUser;

  const objToSend = {
    user_name: username,
    email: isNil(email) || isEmpty(email) ? null : email,
    real_name: name,
    password,
    bairro: neighborhood,
    user_type: userType,
  };

  try {
    await api.post('users', objToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Informações Atualizadas!');
  } catch (e) {
    alert('Ocorreu um erro ao criar o usuário. Verifique com o administrador');
  }
}
