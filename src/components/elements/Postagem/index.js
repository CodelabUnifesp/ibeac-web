import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {IconButton, Input} from '@chakra-ui/react';
import {MdSend, MdVerifiedUser} from 'react-icons/md';

import Icon from '@chakra-ui/icon';

import {get, isEmpty, isNull} from 'lodash';

const Postagem = ({item, user, avatar, verifiable, onCreateComment} = {}) => {
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);

  const numberOfComments = useMemo(() => item?.comments?.length ?? 0, [item]);
  const isAdmin = useMemo(() => user?.user_type === 1, [user]);

  return (
    <Box
      p={{base: 4, lg: 6}}
      mb={6}
      borderRadius={{base: '0px', lg: '10px'}}
      shadow="md"
      bgColor="white">
      <Stack width="100%">
        <Flex mb={4} flexDirection="row" align="center">
          <Box mr={4}>
            <Avatar
              name={get(item, 'author.name')}
              src={get(item, 'author.avatar')}
            />
          </Box>
          <Stack spacing={{base: 0, lg: 1}}>
            <Text fontWeight="bold" fontSize="sm" color="black">
              {get(item, 'author.name')}
            </Text>
            <Text fontSize="xs" color="gray">
              {item.dateTime}
            </Text>
          </Stack>
        </Flex>
        <Stack>
          <Flex mb={2} flexDirection="row" align="center">
            <Text fontWeight="bold" size="md" color="black">
              {item.title}
            </Text>
            {(item.verified || verifiable) && (
              <IconButton
                aria-label="Verificar postagem"
                variant="unstyled"
                icon={
                  <Icon
                    color={!item.verified ? 'gray' : 'green'}
                    boxSize="1em"
                    as={MdVerifiedUser}
                  />
                }
                onClick={() => verifiable && alert(`VERIFICAR POSTAGEM`)}
              />
            )}
          </Flex>
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
            <Box p={4} px={{base: 0, lg: 4}}>
              <Flex
                flexDirection="row"
                align="center"
                mb={numberOfComments > 0 ? 8 : 0}>
                <Box mr={{base: 2, lg: 4}}>
                  <Avatar name={user.name} src={avatar} />
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
                  isLoading={creatingComment}
                  onClick={(event) => {
                    setCreatingComment(true);
                    onCreateComment && onCreateComment(newComment, item.id);
                  }}
                />
              </Flex>
              <Stack spacing={4}>
                {get(item, 'comments', []).map((comment, index) => (
                  <Flex key={index} flexDirection="row" align="flex-start">
                    <Box mr={{base: 2, lg: 4}}>
                      <Avatar
                        name={comment.author?.name}
                        src={comment.author?.avatar}
                      />
                    </Box>
                    <Box
                      p={{base: 3, lg: 4}}
                      background="#ddd"
                      borderRadius="10px">
                      <Stack direction="row" justifyContent="space-between">
                        <Text
                          mb={4}
                          fontWeight="bold"
                          fontSize="xs"
                          color="black">
                          {comment.author?.name}
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
  user: '????',
  avatar: 'https://bit.ly/dan-abramov',
  verifiable: false,
  onCreateComment: () => {},
};
Postagem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    },
    dateTime: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    verified: PropTypes.bool,
  }),
  user: PropTypes.string,
  avatar: PropTypes.string,
  verifiable: PropTypes.bool,
  onCreateComment: PropTypes.func,
};

export default Postagem;
