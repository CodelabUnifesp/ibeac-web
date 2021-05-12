import React from 'react';
import PropTypes from 'prop-types';
import BodyContainer from '../../../components/Body';

function Create(props) {
  return (
    <>
      <BodyContainer>
        <p>Criar Postagem</p>
      </BodyContainer>
    </>
  );
}

Create.displayName = 'Create';
Create.propTypes = {};

export default Create;
