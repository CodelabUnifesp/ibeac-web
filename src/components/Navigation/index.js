import React, {useRef} from 'react';

import {Text, Box} from '@chakra-ui/react';

import {Icon} from '@mdi/react';
import {
  mdiHome,
  mdiHeart,
  mdiAutorenew,
  mdiDramaMasks,
  mdiFormatListChecks,
  mdiAccountBoxMultipleOutline,
  mdiLogout,
} from '@mdi/js';
import {Menu, MenuItem, Divider} from './styles';

const Navigation = () => {
  const ok = useRef();

  return (
    <Menu>
      <MenuItem className="selected" to="/">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiHome} />
        </Text>
        Início
      </MenuItem>
      <Divider />
      <MenuItem to="/how">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiHeart} />
        </Text>
        Saúde
      </MenuItem>
      <MenuItem to="/faetures">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiAutorenew} />
        </Text>
        Trocas
      </MenuItem>
      <MenuItem to="/pricing">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiDramaMasks} />
        </Text>
        Cultura e Lazer
      </MenuItem>
      <Divider />
      <MenuItem to="/faetures">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiAccountBoxMultipleOutline} />
        </Text>
        Complemento de Dados
      </MenuItem>
      <MenuItem to="/pricing">
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiFormatListChecks} />
        </Text>
        Formulário Socioeconômico
      </MenuItem>
      <Divider />
      <MenuItem
        className="compact"
        to="/signup"
        isLast
        color={{base: 'primary.700', lg: 'black'}}
        bg={{base: 'primary.700', lg: 'none'}}>
        <Text className="icon" mr={2}>
          <Icon size={1} path={mdiLogout} />
        </Text>
        Sair
      </MenuItem>
    </Menu>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
