import React from 'react';
import {BodyContainer} from '../../Components/Body';
import Header from '../../Components/Header';

function Home(props) {
  return (
    <>
      <Header />
      <BodyContainer>
        <p>Tela inicial</p>
      </BodyContainer>
    </>
  )
}

export default Home;