import React from 'react';
import PropTypes from 'prop-types';

import {Box, Text} from '@chakra-ui/layout';
import {MdMenu, MdClose} from 'react-icons/md';

import Icon from '@chakra-ui/icon';
import {IconButton} from '@chakra-ui/button';
import {Container} from './styles';

const Header = ({children, open, onMenu} = {}) => (
  <>
    <Container
      p={6}
      bg="primary.600"
      color="white"
      style={open ? {boxShadow: 'none'} : {}}>
      <Text fontWeight="regular" fontSize="xl">
        IBEApp
      </Text>

      <Box display={{base: 'block', xs: 'none'}}>
        <IconButton
          onClick={onMenu}
          colorScheme="white"
          variant="link"
          icon={<Icon fontSize="2xl" as={open ? MdClose : MdMenu} />}
        />
      </Box>
    </Container>
    {children}
  </>
);

Header.displayName = 'Header';
Header.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onMenu: PropTypes.func,
};
Header.defaultProps = {
  children: null,
  open: false,
  onMenu: undefined,
};

export default Header;
