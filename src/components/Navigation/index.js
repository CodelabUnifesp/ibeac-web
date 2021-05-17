import React from 'react';
import {
  mdiHome,
  mdiHeart,
  mdiAutorenew,
  mdiDramaMasks,
  mdiFormatListChecks,
  mdiAccountBoxMultipleOutline,
  mdiLogout,
} from '@mdi/js';
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
      to: '/login',
    },
    {
      title: 'Trocas',
      icon: mdiAutorenew,
    },
    {
      title: 'Cultura e lazer',
      icon: mdiDramaMasks,
    },
  ];

  const informationSection = [
    {
      title: 'Complemento de Dados',
      icon: mdiAccountBoxMultipleOutline,
    },
    {
      title: 'Formulário Socioeconômico',
      icon: mdiFormatListChecks,
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

  const sidebarList = sidebarSections.map((sectionItems) => (
    <>
      {sectionItems.map((item) => (
        <SidebarItem key={item.title} title={item.title} icon={item.icon} />
      ))}
      <Divider />
    </>
  ));

  return <Menu>{sidebarList}</Menu>;
};

Navigation.displayName = 'Navigation';

export default Navigation;
