import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import {MdSend, MdVerifiedUser} from 'react-icons/md';

import {Button} from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';

import {get} from 'lodash';

import Comentario from '../Comentario';

const Postagem = ({
  item,
  user,
  avatar,
  verifiable,
  fetchComments,
  onCreateComment,
  onAddSelo,
} = {}) => {
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newCommentInvalid, setNewCommentInvalid] = useState(false);
  const [creatingComment, setCreatingComment] = useState(false);

  const [comments, setComments] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  const [numberOfComments, setNumberOfComments] = useState(item?.comments);

  const [verifyingPost, setVerifyingPost] = useState(false);

  const {isOpen, onOpen, onClose} = useDisclosure();

  const [messageHeader, setMessageHeader] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const fetchAndUpdateComments = useCallback(
    (id) => {
      if (numberOfComments > 0) setLoadingComments(true);

      fetchComments(id).then((list) => {
        setComments(list);
        setNumberOfComments(list.length);
        setLoadingComments(false);
        setCreatingComment(false);
      });
    },
    [fetchComments, numberOfComments],
  );

  // se comments está nulo (ainda não houve um fetch com sucesso da api)
  useEffect(() => {
    if (openComments && item?.id && comments === null)
      fetchAndUpdateComments(item?.id);
  }, [openComments, item, comments, fetchAndUpdateComments]);

  useEffect(() => {
    if (verifyingPost && item?.id && onAddSelo) {
      onAddSelo(item.id).then((success) => {
        if (success) {
          setMessageHeader('Sucesso!');
          setMessageBody('A postagem foi verificada com sucesso!');
          item.verified = true;
          onOpen();
        } else {
          setMessageHeader('Erro!');
          setMessageBody(
            'Ocorreu um erro ao verificar a postagem. Verifique com o administrador',
          );
        }

        setVerifyingPost(false);
      });
    }
  }, [verifyingPost, item, onAddSelo, onOpen]);

  return (
    <>
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
                {item.dateTime.fromNow()}
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
                  aria-label={
                    item.verified
                      ? 'Postagem verificada'
                      : 'Clique aqui para verificar postagem'
                  }
                  cursor={item.verified ? 'auto' : 'pointer'}
                  display="flex"
                  icon={
                    <Icon
                      color={!item.verified ? 'gray' : 'green'}
                      boxSize="1em"
                      as={MdVerifiedUser}
                    />
                  }
                  isDisabled={!verifiable}
                  isLoading={verifyingPost}
                  onClick={() =>
                    verifiable && !item.verified && setVerifyingPost(true)
                  }
                  variant="unstyled"
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
                    isInvalid={newCommentInvalid}
                  />
                  <mdiSend />
                  <IconButton
                    disable={creatingComment}
                    ml={4}
                    colorScheme="primary"
                    icon={<Icon fontSize="2xl" as={MdSend} />}
                    isRound
                    isLoading={creatingComment}
                    onClick={(event) => {
                      if (onCreateComment && newComment) {
                        setNewCommentInvalid(false);
                        onCreateComment(newComment, item.id).then(() => {
                          setNumberOfComments(numberOfComments + 1);
                          fetchAndUpdateComments(item.id);
                        });
                        setNewComment('');
                      } else {
                        setNewCommentInvalid(true);
                      }
                    }}
                  />
                </Flex>
                <Stack spacing={4}>
                  {loadingComments && (
                    <Box w="100%" textAlign="center">
                      <Spinner colorScheme="primary.main" />
                    </Box>
                  )}
                  {(comments ?? []).map((comment, index) => (
                    <Comentario key={index} item={comment} />
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Modal de feedback de Mensagem */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{messageHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="black" align="justify">
              {messageBody}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

Postagem.displayName = 'Postagem';
Postagem.defaultProps = {
  item: {},
  user: '????',
  avatar: 'https://bit.ly/dan-abramov',
  verifiable: false,
  fetchComments: async () => [],
  onCreateComment: () => {},
  onAddSelo: () => {},
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
    dateTime: PropTypes.object.isRequired, // TODO: invoke moment object type
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    verified: PropTypes.bool,
  }),
  user: PropTypes.string,
  avatar: PropTypes.string,
  verifiable: PropTypes.bool,
  fetchComments: PropTypes.func,
  onCreateComment: PropTypes.func,
  onAddSelo: PropTypes.func,
};

export default Postagem;
