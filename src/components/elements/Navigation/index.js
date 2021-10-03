import React from 'react';

import {
  mdiHome,
  mdiFormatListChecks,
  mdiAccountBoxMultipleOutline,
  mdiLogout,
  mdiAccountPlus,
} from '@mdi/js';
import {Box} from '@chakra-ui/layout';
import {useLocation} from 'react-router-dom';
import {useBreakpointValue} from '@chakra-ui/react';
import {Menu, Divider} from './styles';
import SidebarItem from '../SidebarItem';

const essentialsSection = [
  {
    title: 'Início',
    icon: mdiHome,
    to: '/',
  },
];

const informationSection = [
  {
    title: 'Complemento de Dados',
    icon: mdiAccountBoxMultipleOutline,
    to: '/complemento-de-dados',
  },
  {
    title: 'Formulário Socioeconômico',
    icon: mdiFormatListChecks,
    to: '/form',
  },
  {
    title: 'Cadastrar Novo Usuário',
    icon: mdiAccountPlus,
    to: '/register',
  },
];

const logoutSection = [
  {
    title: 'Sair',
    icon: mdiLogout,
    to: '/logout',
  },
];

const Navigation = () => {
  const location = useLocation();
  const sidebarSections = useBreakpointValue(
    {
      base: [
        essentialsSection,
        // categoriesSection,
        informationSection,
        logoutSection,
      ],
      lg: [
        essentialsSection,
        // categoriesSection,
        informationSection,
        logoutSection,
      ],
    },
    'base',
  );

  const sidebarList = sidebarSections.map((sectionItems, index) => (
    <Box
      width="100%"
      key={index}
      onClick={() => {
        window.scrollTo(0, 0);
      }}>
      {sectionItems.map((item) => (
        <SidebarItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          to={item.to}
          selected={location.pathname === item.to}
        />
      ))}
      {index < sidebarSections.length - 1 && <Divider />}
    </Box>
  ));

  return <Menu>{sidebarList}</Menu>;
};

Navigation.displayName = 'Navigation';

export default Navigation;
