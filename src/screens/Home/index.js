import React, {useMemo, useState} from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel, Box} from '@chakra-ui/react';

import Default from '../../layouts/default';
import Feed from '../../components/Feed';

import {Wrapper} from './styles';

function Home(props) {
  const [tab, setTab] = useState(0);

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
            },
            {
              title: 'Postagem #2',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 2,
                name: 'Trocas',
              },
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
            },
            {
              title: 'Postagem Recomendada #2',
              description:
                'Sit voluptate veniam laborum quis Lorem nostrud. Duis esse aute veniam anim aliquip est cupidatat pariatur Lorem elit proident nisi minim. Ex occaecat voluptate irure occaecat eu occaecat minim velit amet voluptate deserunt. Duis elit nostrud ut irure ad et magna elit cupidatat non aliquip. Exercitation irure reprehenderit sit duis sint magna elit eiusmod tempor. Ex magna fugiat consectetur consequat in tempor et irure elit.',
              category: {
                id: 3,
                name: 'Cultura e Lazer',
              },
            },
          ]}
        />
      );

    return null;
  }, [tab]);

  return (
    <>
      <Default>
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
              <Tab
                flex={{base: 1, lg: 0}}
                borderBottom={{
                  base: '5px solid var(--chakra-colors-primary-600)',
                  lg: 'none',
                }}
                borderRadius={{base: 0, lg: 10}}
                _selected={{
                  color: 'white',
                  bg: 'primary.600',
                  fontWeight: 600,
                  borderBottomColor: 'rgba(255, 255, 255, 0.9)',
                }}>
                Feed
              </Tab>
              <Tab
                flex={{base: 1, lg: 0}}
                borderBottom={{
                  base: '5px solid var(--chakra-colors-primary-600)',
                  lg: 'none',
                }}
                borderRadius={{base: 0, lg: 10}}
                _selected={{
                  color: 'white',
                  bg: 'primary.600',
                  fontWeight: 600,
                  borderBottomColor: 'rgba(255, 255, 255, 0.9)',
                }}>
                Recomendados
              </Tab>
            </TabList>
          </Tabs>

          <Box className="input" my={{base: 4, lg: 0}} p={4} bg="lightgrey">
            No que você está pensando?
          </Box>

          {tabPanel}
        </Wrapper>
      </Default>
    </>
  );
}

export default Home;
