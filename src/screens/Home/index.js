import React, {useReducer, useState} from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {Button} from '@chakra-ui/button';

import {set} from 'lodash/fp';
import {get} from 'lodash';
import BodyContainer from '../../components/Body';
import EditablePostagem from '../../components/EditablePostagem';

function Home(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [newPostagem, setNewPostagem] = useState({});

  return (
    <>
      <p>Tela inicial</p>
      <br />
      <Button onClick={onOpen}>Criar Postagem</Button>
      <br />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Postagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <EditablePostagem
              value={newPostagem}
              onChange={(key, value) =>
                setNewPostagem(set(key, value, newPostagem))
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={() =>
                alert(
                  `Nova Postagem\ntitle: ${get(
                    newPostagem,
                    'title',
                  )}\ndescription: ${get(
                    newPostagem,
                    'description',
                  )}\ncategory: ${get(newPostagem, 'category')}`,
                )
              }>
              Criar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;
