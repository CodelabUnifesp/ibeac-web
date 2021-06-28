import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {Button} from '@chakra-ui/button';
import {IconButton} from '@chakra-ui/react';
import {MdSend} from 'react-icons/md';

import Icon from '@chakra-ui/icon';

import {get} from 'lodash';

const Postagem = ({item} = {}) => {
  const [openComments, setOpenComments] = useState(false);

  const numberOfComments = useMemo(() => get(item, 'comments.length', 0), [
    item,
  ]);

  return (
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
          {numberOfComments > 0 && (
            <Text
              cursor="pointer"
              fontStyle={openComments ? 'italic' : ''}
              size="xs"
              color="gray"
              align="right"
              py={2}
              borderTop="1px solid #eee"
              borderBottom={openComments ? '1px solid #eee' : ''}
              onClick={() => setOpenComments(!openComments)}>
              {`${numberOfComments} Comentários`}
            </Text>
          )}
          {openComments > 0 && (
            <Box p={4}>
              <Flex flexDirection="row" align="center">
                <Box mr={4}>
                  <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
                </Box>
                <Button
                  color="#606060"
                  fontFamily="Nunito Sans"
                  fontWeight="500"
                  borderRadius="50px"
                  w="100%"
                  h="auto"
                  display="inline-block"
                  textAlign="left"
                  background="white"
                  border="1px solid #eee"
                  p={2}
                  pl={4}>
                  Envie um comentário
                </Button>
                <mdiSend />
                <IconButton
                  ml={4}
                  colorScheme="primary"
                  icon={<Icon fontSize="2xl" as={MdSend} />}
                  isRound
                />
              </Flex>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

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
