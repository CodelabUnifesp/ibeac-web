import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Logout = (...props) => {
  const history = useHistory();

  const doLogout = () => {
    localStorage.setItem('token', '');
    history.push('/entrar');
  };

  useEffect(() => {
    doLogout();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
