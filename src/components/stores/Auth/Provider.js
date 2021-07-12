import React, {useEffect, useCallback, useMemo} from 'react';
import useLocalStorage from 'react-use-localstorage';

import jwt from 'jsonwebtoken';

import {get, isEmpty, isNil, isNull} from 'lodash';
import Context from './Context';

const Provider = ({children} = {}) => {
  const [token, setToken] = useLocalStorage('token');
  const [_user, _setUser] = useLocalStorage('user');

  useEffect(() => {
    if (!isNull(token)) {
      const decoded = jwt.decode(token);

      // verificar se o token expirou, se estiver, invalidar a sessão
      if (Date.now() > get(decoded, 'exp', 0) * 1000) {
        setToken(null);
      }
    }
  }, [token, setToken]);

  // TODO: refinar esse useLocalStorage para algo como useLocalStoredState
  const user = useMemo(() => {
    const stringifiedUser =
      isNil(_user) || _user === 'undefined' || _user === 'null' ? '{}' : _user;

    try {
      return JSON.parse(stringifiedUser);
    } catch {
      return {};
    }
  }, [_user]);

  const setUser = useCallback(
    (object) => _setUser(JSON.stringify(object)),
    [_setUser],
  );

  return (
    <Context.Provider value={{token, setToken, user, setUser}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
