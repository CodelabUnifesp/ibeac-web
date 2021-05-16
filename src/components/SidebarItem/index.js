import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '@mdi/react';
import {Text} from '@chakra-ui/layout';
import {MenuItem} from './styles';

const SidebarItem = ({title, icon} = {}) => (
  <MenuItem>
    <Text className="icon" mr={2}>
      <Icon size={1} path={icon} />
    </Text>
    {title}
  </MenuItem>
);

SidebarItem.displayName = 'SidebarItem';
SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default SidebarItem;
