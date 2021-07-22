import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function create(token, newPostagem, currentUserId) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  const {title, category, description} = newPostagem;

  const objToSend = {
    texto: description,
    criador: currentUserId,
    titulo: title,
    categoria: category,
  };

  try {
    await api
      .post('postagens', objToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      });
  } catch (e) {
    alert('Ocorreu um erro ao criar a postagem. Verifique com o administrador');
  }
}
