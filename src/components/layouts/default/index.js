import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';

import {Box, Collapse, Stack} from '@chakra-ui/react';

import {get} from 'lodash';
import Header from '../../elements/Header';

import {Container, Content, BoxAside} from './styles.js';
import Navigation from '../../elements/Navigation';
import Sidebar from '../../elements/Sidebar';

import {Context as AuthContext} from '../../stores/Auth';

const Default = ({children} = {}) => {
  const [menu, setMenu] = useState(false);
  const {user} = useContext(AuthContext);

  return (
    <>
      <Container bg="#F0F6F8">
        {/* <NavBar /> */}
        <Header open={menu} onMenu={() => setMenu(!menu)}>
          <Collapse in={menu} animateOpacity>
            <Box
              bg={{base: 'primary.600', lg: 'white'}}
              color={{base: 'white', lg: 'primary.600'}}
              zIndex={9}
              boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25)">
              <Box pb={6} flexBasis={{base: '100%', lg: 'none'}}>
                <Stack
                  spacing={1}
                  align="flex-start"
                  justify="center"
                  direction="column">
                  <Navigation />
                </Stack>
              </Box>
            </Box>
          </Collapse>
        </Header>
        <Content mt={{base: 0, lg: 2}} p={{base: 0, lg: 4}}>
          {/* display={{base: 'none', lg: 'flex'}} */}
          <BoxAside width="100%">
            <Sidebar
              name={get(user, 'name', '???')}
              avatar={get(user, 'avatar', 'https://bit.ly/dan-abramov')}>
              <Navigation />
            </Sidebar>
          </BoxAside>
          <Box width="100%">{children}</Box>
        </Content>
      </Container>
    </>
  );
};

Default.displayName = 'Default';
Default.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Default;
