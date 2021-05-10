import React, {useRef} from 'react';

import {Menu} from '@chakra-ui/react';

import {MenuItem} from './styles';

const Navigation = () => {
  const ok = useRef();

  return (
    <Menu>
      <MenuItem to="/">Início</MenuItem>
      <br />
      <MenuItem to="/how">Saúde</MenuItem>
      <MenuItem to="/faetures">Trocas</MenuItem>
      <MenuItem to="/pricing">Cultura e Lazer</MenuItem>
      <br />
      <MenuItem to="/faetures">Complemento de Dados</MenuItem>
      <MenuItem to="/pricing">Formulário Socioeconômico</MenuItem>
      <br />
      <MenuItem to="/signup" isLast color="primary.100" bg="primary.700">
        Sair
      </MenuItem>
    </Menu>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
