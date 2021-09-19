import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {
  Tabs,
  TabList,
  Tab,
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
  useBreakpointValue,
} from '@chakra-ui/react';

import {Avatar} from '@chakra-ui/avatar';

import {Button} from '@chakra-ui/button';

import {set} from 'lodash/fp';
import {get, isNull} from 'lodash';
import EditablePostagem from '../../components/elements/EditablePostagem';
import Feed from '../../components/elements/Feed';

import {Context as AuthContext} from '../../components/stores/Auth';

import {Wrapper} from './styles';

import * as Postagens from '../../domain/postagens';
import * as Categorias from '../../domain/categorias';
import * as Bairros from '../../domain/bairros';
import * as Comentarios from '../../domain/comentarios';

function Home() {
  const tabs = useBreakpointValue(
    {
      base: ['Feed', 'Recomendados'],
      lg: ['Feed', 'Recomendados', 'Saúde', 'Trocas', 'Cultura e Lazer'],
    },
    'base',
  );

  const [tab, setTab] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user, token} = useContext(AuthContext);

  const categories = useRef(null);
  const neighborhoods = useRef(null);

  const [posts, setPosts] = useState(null);
  const [newPostagem, setNewPostagem] = useState({});

  useEffect(() => {
    // recuperando lista de categorias para tabs
    categories.current = Categorias.getAll(token);
  }, [token]);

  useEffect(() => {
    // HACK: a api nao envia nome de categoria/bairro, comentários vinculados à uma postagem OU avatar do autor, então isso é um workaround
    neighborhoods.current = Bairros.getAll(token);
  }, [token]);

  useEffect(() => {
    /**
     * tab  0 -> FEED
     *      1 -> RECOMENDADOS
     */

    const fetchPosts = async () => {
      setPosts(null);
      let result = [];
      if (tab === 0 || tab === 1)
        result = await Postagens.getAll(token, {recommended: tab === 1});
      else {
        // FUTURE: como qualquer discussão de adição de novas categorias é pra próxima "sprint", no momento vai ficar meio hardcoded assim
        result = await Postagens.getAll(token, {
          category:
            (await categories.current).find((c) => c.name === tabs[tab])?.id ??
            null,
        });
      }

      if (isNull(result)) return;

      const [allCategories, allNeighborhoods, allComments] = await Promise.all([
        categories.current,
        neighborhoods.current,
      ]);

      setPosts(
        result.map((post) => {
          // HACK: a api nao envia nome de categoria/bairro, então isso é um workaround

          const category = allCategories.find((c) => c.id === post.category.id);
          post.category.name = get(category, 'name', '—');

          const neighborhood = allNeighborhoods.find(
            (b) => b.id === post.neighborhood.id,
          );
          post.neighborhood.name = get(neighborhood, 'name', '—');

          post.author.avatar = null;

          return post;
        }),
      );
    };

    fetchPosts();
  }, [tab, token]);

  const onChangeCallback = useCallback(
    (key, value) =>
      // TODO: show success/message error
      setNewPostagem(set(key, value, newPostagem)),
    [newPostagem],
  );

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

        <Box
          p={6}
          mb={6}
          borderRadius={{base: '0px', lg: '10px'}}
          shadow="md"
          bgColor="white">
          <Flex flexDirection="row" align="center">
            <Box mr={4}>
              <Avatar
                name={get(user, 'name', '???')}
                src={get(user, 'avatar', 'https://bit.ly/dan-abramov')}
              />
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

        <Feed
          user={user.name}
          avatar={get(user, 'avatar', null)}
          canVerifyPost={user.userType === 1}
          fetchComments={async (id) => {
            const post = await Postagens.get(token, id);
            return post?.comments ?? [];
          }}
          onCreateComment={(newComment, itemId) => {
            return Comentarios.create(token, newComment, user.id, itemId); // TODO: show error/success message
          }}
          onAddSelo={(itemId) => {
            return Postagens.addSelo(token, itemId);
          }}
          value={posts}
        />
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
            <EditablePostagem value={newPostagem} onChange={onChangeCallback} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={() => {
                console.log(newPostagem);
                Postagens.create(token, newPostagem, user.id);
              }}>
              {/* TODO: show success/message error */}
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
