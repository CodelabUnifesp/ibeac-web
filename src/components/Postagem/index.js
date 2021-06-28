import React, {useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {Button} from '@chakra-ui/button';
import {IconButton, Input} from '@chakra-ui/react';
import {MdSend} from 'react-icons/md';

import Icon from '@chakra-ui/icon';

import {get, isEmpty, isNull} from 'lodash';

const Postagem = ({item} = {}) => {
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState('');

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
          <Text
            cursor="pointer"
            fontStyle={openComments ? 'italic' : ''}
            fontSize="sm"
            color="gray"
            align="right"
            py={2}
            borderTop="1px solid #eee"
            borderBottom={openComments ? '1px solid #eee' : ''}
            onClick={() => setOpenComments(!openComments)}>
            {numberOfComments > 0
              ? `${numberOfComments} Comentários`
              : 'Comentar'}
          </Text>
          {openComments > 0 && (
            <Box p={4}>
              <Flex flexDirection="row" align="center" mb={8}>
                <Box mr={4}>
                  <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
                </Box>

                <Input
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  borderRadius="50px"
                  placeholder="Envie um comentário"
                  size="md"
                />
                <mdiSend />
                <IconButton
                  disabled={isEmpty(newComment) || isNull(newComment)}
                  ml={4}
                  colorScheme="primary"
                  icon={<Icon fontSize="2xl" as={MdSend} />}
                  isRound
                  onClick={() => alert(`CRIAR NOVO COMENTÁRIO\n ${newComment}`)}
                />
              </Flex>
              <Stack spacing={4}>
                {get(item, 'comments', []).map((comment, index) => (
                  <Flex key={index} flexDirection="row" align="flex-start">
                    <Box mr={4}>
                      <Avatar name="Usuário" src="https://bit.ly/dan-abramov" />
                    </Box>
                    <Box p={4} background="#ddd" borderRadius="10px">
                      <Stack direction="row" justifyContent="space-between">
                        <Text
                          mb={4}
                          fontWeight="bold"
                          fontSize="xs"
                          color="black">
                          {comment.author}
                        </Text>
                        <Text fontSize="xs" color="gray">
                          {comment.dateTime}
                        </Text>
                      </Stack>

                      <Text fontSize="sm" color="black" align="justify">
                        {comment.body}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
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
