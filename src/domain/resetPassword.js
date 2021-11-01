import api from '../services/api';

// eslint-disable-next-line camelcase
export default function resetPassword({user: username_or_email} = {}) {
  return api.post(
    `esqueci_senha?aud=${process.env.REACT_APP_ME ?? 'plasmedis-web-local'}`,
    {username_or_email},
  );
}
