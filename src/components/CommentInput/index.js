import React from 'react';
import {HStack} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {Input, IconButton} from '@chakra-ui/react';
import {IoMdSend} from 'react-icons/io';

const CommentInput = () => (
  <HStack spacing={4} flexDirection="row" align="center">
    <Avatar
      width="40px"
      height="40px"
      name="Usuário"
      src="https://bit.ly/dan-abramov"
    />
    <Input borderRadius="100px" placeholder="Envie um comentário" />
    <IconButton
      backgroundColor="#31788A"
      _hover={{
        background: '#266170',
      }}
      isRound
      icon={<IoMdSend />}
      colorScheme="teal"
    />
  </HStack>
);

export default CommentInput;
