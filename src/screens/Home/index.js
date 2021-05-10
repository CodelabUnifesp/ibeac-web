import {Button} from '@chakra-ui/button';
import React from 'react';
import BodyContainer from '../../components/Body';

function Home(props) {
  return (
    <>
      <BodyContainer>
        <p>Tela inicial</p>
        <br />
        <Button>Criar Postagem</Button>
      </BodyContainer>
    </>
  );
}

export default Home;
