import React, {useEffect, useCallback, useMemo} from 'react';

import jwt from 'jsonwebtoken';

import {get, isEmpty, isNil, isNull} from 'lodash';
import useLocalStorage from '../../../utils/react/storedState';
import Context from './Context';

import * as Auth from '../../../domain/login';

const Provider = ({children} = {}) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);

  useEffect(() => {
    if (!isNil(token)) {
      const apiAuthProtocol = Auth.get();
      const decoded = jwt.decode(token);

      // verificar se o token expirou, se estiver, invalidar a sessão
      if (Date.now() > get(decoded, 'exp', 0) * 1000) {
        alert('Sua sessão expirou. Por favor, entre novamente.'); // TODO: deixar mais amigável
        setToken(undefined);
        setUser(undefined);
        return;
      }

      apiAuthProtocol.then(({version}) => {
        if (version !== decoded.auth) {
          alert('Sua sessão expirou. Por favor, entre novamente.'); // TODO: deixar mais amigável
          setToken(undefined);
          setUser(undefined);
        }
      });
    }
  }, [token, setToken, setUser]);

  useEffect(() => {
    if (isEmpty(user) || isNil(user)) {
      setToken(undefined);
      setUser(undefined);
    }
  }, [user, setToken, setUser]);

  const memoizedValue = useMemo(
    () => ({token, setToken, user, setUser}),
    [token, setToken, user, setUser],
  );

  return <Context.Provider value={memoizedValue}>{children}</Context.Provider>;
};

export default Provider;
