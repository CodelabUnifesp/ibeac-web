import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Box, Collapse, Stack} from '@chakra-ui/react';

import Header from '../../components/Header';

import {Container, Content} from './styles.js';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';

const Default = ({children} = {}) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Container>
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
                  spacing={8}
                  align="center"
                  justify="center"
                  direction="column">
                  <Navigation />
                </Stack>
              </Box>
            </Box>
          </Collapse>
        </Header>
        <Content mt={2} p={4}>
          <Box display={{base: 'none', lg: 'flex'}}>
            <Sidebar>
              <Navigation />
            </Sidebar>
          </Box>
          <Box>{children}</Box>
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
