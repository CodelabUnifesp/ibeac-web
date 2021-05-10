import React from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Button, Heading, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';

const Sidebar = ({children} = {}) => (
  <Stack>
    <Flex
      flexDirection="row"
      align="center"
      bg="primary.600"
      p={6}
      borderRadius="10px"
      shadow="md">
      <Box mr={4}>
        <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
      </Box>
      <Heading size="sm" color="whiteAlpha.900">
        Olá, Usuário!
      </Heading>
    </Flex>
    <Box>{children}</Box>
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
