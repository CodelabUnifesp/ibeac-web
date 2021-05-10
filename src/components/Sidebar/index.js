import React from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Button, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';

import Container from '../Container';

const Sidebar = ({children} = {}) => (
  <Stack width="100%">
    <Flex
      flexDirection="row"
      align="center"
      bg="primary.600"
      p={6}
      mb={2}
      borderRadius="10px"
      shadow="md">
      <Box mr={4}>
        <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
      </Box>
      <Text fontWeight="600" size="sm" color="whiteAlpha.900">
        Olá, Usuário!
      </Text>
    </Flex>
    <Container pt={4} pb={4}>
      {children}
    </Container>
  </Stack>
);

Sidebar.displayName = 'Sidebar';
Sidebar.defaultProps = {
  children: null,
};
Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
