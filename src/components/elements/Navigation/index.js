import React from 'react';
import {
  mdiHome,
  mdiHeart,
  mdiAutorenew,
  mdiDramaMasks,
  mdiFormatListChecks,
  mdiAccountBoxMultipleOutline,
  mdiLogout,
  mdiAccountPlus,
} from '@mdi/js';
import {Box} from '@chakra-ui/layout';
import {useLocation} from 'react-router-dom';
import {Menu, Divider} from './styles';
import SidebarItem from '../SidebarItem';

const Navigation = () => {
  const essentialsSection = [
    {
      title: 'Início',
      icon: mdiHome,
      to: '/',
    },
  ];

  const categoriesSection = [
    {
      title: 'Saúde',
      icon: mdiHeart,
      to: '/saude',
    },
    {
      title: 'Trocas',
      icon: mdiAutorenew,
      to: '/trocas',
    },
    {
      title: 'Cultura e lazer',
      icon: mdiDramaMasks,
      to: '/cultura-e-lazer',
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
    },
  ];

  const sidebarSections = [
    essentialsSection,
    categoriesSection,
    informationSection,
    logoutSection,
  ];

  const location = useLocation();

  const sidebarList = sidebarSections.map((sectionItems, index) => (
    <Box width="100%" key={index}>
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
