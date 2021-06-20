import React, {useReducer, useMemo, useState, useEffect} from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
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
import EditablePostagem from '../../components/EditablePostagem';
import Feed from '../../components/Feed';

import {Wrapper} from './styles';

function Home(props) {
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [newPostagem, setNewPostagem] = useState({});

  const tabPanel = useMemo(() => {
    if (tab === 0)
      return (
        <Feed
          value={[
            {
              title: 'Postagem #1',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 1,
                name: 'Saúde',
              },
              userName: 'Usuário teste',
              dateTime: '18 de Abril às 21:00',
            },
            {
              title: 'Postagem #2',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 2,
                name: 'Trocas',
              },
              userName: 'Usuário teste 2',
              dateTime: '20 de Abril às 21:00',
            },
          ]}
        />
      );
    if (tab === 1)
      return (
        <Feed
          value={[
            {
              title: 'Postagem Recomendada #1',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 3,
                name: 'Cultura e Lazer',
              },
              userName: 'Usuário teste 3',
              dateTime: '22 de Abril às 18:00',
            },
            {
              title: 'Postagem Recomendada #2',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 3,
                name: 'Cultura e Lazer',
              },
              userName: 'Usuário teste 4',
              dateTime: '24 de Abril às 15:00',
            },
          ]}
        />
      );

    return null;
  }, [tab]);

  useEffect(() => {
    window.innerWidth >= 1024
      ? setTabs(['Feed', 'Recomendados', 'Saúde', 'Trocas', 'Cultura e lazer'])
      : setTabs(['Feed', 'Recomendados']);
  }, []);

  return (
    <>
      <Wrapper px={{base: 0, lg: 6}}>
        <Tabs
          className="tabs"
          isManual
          variant="unstyled"
          index={tab}
          onChange={(value) => setTab(value)}
          gridRow={{base: 1, lg: 2}}
          my={{base: 0, lg: 4}}>
          <TabList
            color={{base: 'light.300', lg: '#333'}}
            bg={{base: 'primary.600', lg: 'transparent'}}>
            {tabs.map((tabName, index) => (
              <Tab
                key={index}
                flex={{base: 1, lg: 1}}
                align="start"
                borderBottom={{
                  base: '5px solid var(--chakra-colors-primary-600)',
                  lg: 'none',
                }}
                borderRadius={{base: 0, lg: 10}}
                shadow={{base: 'none', lg: 'sm'}}
                mr={{base: 0, lg: 4}}
                bg={{base: 'none', lg: 'light.200'}}
                color={{base: 'none', lg: 'primary.700'}}
                fontWeight={{base: 400, lg: 600}}
                _selected={{
                  color: 'white',
                  bg: 'primary.600',
                  fontWeight: 600,
                  borderBottomColor: 'rgba(255, 255, 255, 0.9)',
                }}>
                {tabName}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <Box className="input" my={{base: 4, lg: 0}} p={4} bg="lightgrey">
          <Button onClick={onOpen}>
            No que você está pensando?{' '}
            <span style={{fontSize: 9}}>(CRIAR POSTAGEM)</span>
          </Button>
        </Box>

        {tabPanel}
      </Wrapper>

      {/* Modal de Criar Postagem */}
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
