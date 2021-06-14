import React from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';

const Postagem = ({item} = {}) => (
  <Box
    p={6}
    mb={6}
    borderRadius={{base: '0px', lg: '10px'}}
    shadow="md"
    bgColor="white">
    <Stack width="100%">
      <Flex mb={4} flexDirection="row" align="center">
        <Box mr={4}>
          <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
        </Box>
        <Stack spacing={{base: 0, lg: 1}}>
          <Text fontWeight="bold" fontSize="xs" color="black">
            {item.userName}
          </Text>
          <Text fontSize="xs" color="gray">
            {item.dateTime}
          </Text>
        </Stack>
      </Flex>
      <Stack>
        <Text mb={2} fontWeight="bold" size="md" color="black">
          {item.title}
        </Text>
        <Text size="sm" color="black" align="justify">
          {item.description}
        </Text>
      </Stack>
    </Stack>
  </Box>
);

Postagem.displayName = 'Postagem';
Postagem.defaultProps = {
  item: {},
};
Postagem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    },
    userName: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
  }),
};

export default Postagem;
