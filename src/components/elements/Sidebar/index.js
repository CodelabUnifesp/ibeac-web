import React from 'react';
import PropTypes from 'prop-types';

import {Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';

import Container from '../Container';
import {StackAside} from './styles';

const Sidebar = ({children, name, avatar} = {}) => {
  return (
    <StackAside width="100%">
      <Flex
        flexDirection="row"
        align="center"
        bg="primary.600"
        p={6}
        mb={2}
        borderRadius="10px"
        shadow="md">
        <Box mr={4}>
          <Avatar name={name} src={avatar} />
        </Box>
        <Text fontWeight="600" size="sm" color="whiteAlpha.900">
          Olá, {name}!
        </Text>
      </Flex>
      <Container pt={4} pb={4}>
        {children}
      </Container>
    </StackAside>
  );
};

Sidebar.displayName = 'Sidebar';
Sidebar.defaultProps = {
  children: null,
  name: 'Unknown',
  avatar: 'https://bit.ly/dan-abramov',
};
Sidebar.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Sidebar;
