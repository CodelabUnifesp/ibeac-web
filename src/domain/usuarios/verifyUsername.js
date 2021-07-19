import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function verifyUsername(token, username) {
  if (isNil(username) || isEmpty(username)) return false;

  const response = await api.get(`users/username/verify/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data.success ?? false;
}
