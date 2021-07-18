import api from '../../services/api';

export default async function create(newComentario, currentUserId, postagemId) {
  const objToSend = {
    texto: newComentario,
    criador: currentUserId,
    postagem: postagemId,
  };

  try {
    await api.post('comentarios', objToSend).then((res) => {
      window.location.reload();
    });
  } catch (e) {
    alert(
      'Ocorreu um erro ao adicionar o comentário. Verifique com o administrador',
    );
  }
}
