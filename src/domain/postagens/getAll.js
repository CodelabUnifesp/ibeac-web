import api from '../../services/api';

export default function getAll() {
  return api.get('postagens');
}
