import api from '../../services/api';

export default async function create(newPostagem, currentUserId) {
  const {title, category, description} = newPostagem;

  const objToSend = {
    texto: description,
    criador: currentUserId,
    titulo: title,
    categoria: category,
  };

  try {
    await api.post('postagens', objToSend).then((res) => {
      window.location.reload();
    });
  } catch (e) {
    alert('Ocorreu um erro ao criar a postagem. Verifique com o administrador');
  }
}
