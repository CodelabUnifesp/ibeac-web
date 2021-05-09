import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Box, Button, Collapse, Menu, MenuItem, Stack} from '@chakra-ui/react';

import Header from '../../components/Header';

import {Container} from './styles.js';
import NavBar from '../../components/Navbar';

const Default = ({children} = {}) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Container>
        {/* <NavBar /> */}
        <Header open={menu} onMenu={() => setMenu(!menu)}>
          <Collapse in={menu} animateOpacity>
            <Box
              bg="primary.600"
              color="white"
              pt="78px"
              zIndex={9}
              boxShadow="0px 0px 0.5rem 0px rgba(0, 0, 0, 0.25)">
              <Box pb={6} flexBasis={{base: '100%', md: 'none'}}>
                <Stack
                  spacing={8}
                  align="center"
                  justify={['center', 'space-between', 'flex-end', 'flex-end']}
                  direction={['column', 'row', 'row', 'row']}>
                  <Menu>
                    <MenuItem justifyContent="center" to="/">
                      Início
                    </MenuItem>
                    <br />
                    <MenuItem justifyContent="center" to="/how">
                      Saúde
                    </MenuItem>
                    <MenuItem justifyContent="center" to="/faetures">
                      Trocas
                    </MenuItem>
                    <MenuItem justifyContent="center" to="/pricing">
                      Cultura e Lazer
                    </MenuItem>
                    <br />
                    <MenuItem justifyContent="center" to="/faetures">
                      Complemento de Dados
                    </MenuItem>
                    <MenuItem justifyContent="center" to="/pricing">
                      Formulário Socioeconômico
                    </MenuItem>
                    <br />
                    <MenuItem
                      justifyContent="center"
                      to="/signup"
                      isLast
                      color="primary.200"
                      bg="primary.700">
                      Sair
                    </MenuItem>
                  </Menu>
                </Stack>
              </Box>
            </Box>
          </Collapse>
        </Header>
        <div className="content">{children}</div>
      </Container>
    </>
  );
};

Default.displayName = 'Default';
Default.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Default;
