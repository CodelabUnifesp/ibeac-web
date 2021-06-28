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
  Flex,
} from '@chakra-ui/react';

import {Avatar} from '@chakra-ui/avatar';

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
              comments: [
                {
                  body:
                    'Sunt quis aliqua ut cillum pariatur eiusmod eiusmod commodo nisi labore officia duis incididunt ea. Amet eu nostrud excepteur cillum minim id mollit anim labore in. Esse culpa laboris sit consequat occaecat occaecat officia sunt labore.',
                  author: 'John Doe',
                  dateTime: '23 de Maio às 14:32',
                },
                {
                  body:
                    'Cillum minim laboris consequat sit proident amet magna labore culpa esse eiusmod. Culpa in cillum culpa ea aliquip reprehenderit fugiat nostrud elit nisi occaecat in. Ipsum et nisi culpa ad laborum sint irure laborum et. Veniam ipsum ut eu adipisicing ullamco aute cupidatat ea ipsum consectetur nostrud irure minim veniam.',
                  author: 'Jane Doe',
                  dateTime: '23 de Maio às 14:32',
                },
                {
                  body:
                    'Sunt quis aliqua ut cillum pariatur eiusmod eiusmod commodo nisi labore officia duis incididunt ea. Amet eu nostrud excepteur cillum minim id mollit anim labore in. Esse culpa laboris sit consequat occaecat occaecat officia sunt labore.',
                  author: 'John Doe',
                  dateTime: '23 de Maio às 14:32',
                },
              ],
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
              comments: [
                {
                  body:
                    'Sunt quis aliqua ut cillum pariatur eiusmod eiusmod commodo nisi labore officia duis incididunt ea. Amet eu nostrud excepteur cillum minim id mollit anim labore in. Esse culpa laboris sit consequat occaecat occaecat officia sunt labore.',
                  author: 'John Doe',
                  dateTime: '23 de Maio às 14:32',
                },
                {
                  body:
                    'Cillum minim laboris consequat sit proident amet magna labore culpa esse eiusmod. Culpa in cillum culpa ea aliquip reprehenderit fugiat nostrud elit nisi occaecat in. Ipsum et nisi culpa ad laborum sint irure laborum et. Veniam ipsum ut eu adipisicing ullamco aute cupidatat ea ipsum consectetur nostrud irure minim veniam.',
                  author: 'Jane Doe',
                  dateTime: '23 de Maio às 14:32',
                },
                {
                  body:
                    'Sunt quis aliqua ut cillum pariatur eiusmod eiusmod commodo nisi labore officia duis incididunt ea. Amet eu nostrud excepteur cillum minim id mollit anim labore in. Esse culpa laboris sit consequat occaecat occaecat officia sunt labore.',
                  author: 'John Doe',
                  dateTime: '23 de Maio às 14:32',
                },
              ],
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
    setTabs(['Feed', 'Recomendados']);
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
                flex={{base: 1, lg: 0}}
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

        <Box
          p={6}
          mb={6}
          borderRadius={{base: '0px', lg: '10px'}}
          shadow="md"
          bgColor="white">
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
              p={3}
              pl={6}
              onClick={onOpen}>
              No que você está pensando?{' '}
            </Button>
          </Flex>
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
