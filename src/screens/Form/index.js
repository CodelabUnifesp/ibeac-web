import React from 'react';
import {Text} from '@chakra-ui/react';
import * as S from './styles';
import questions from './questions';
import FormQuestions from '../../components/elements/FormQuestions';

const Form = (...props) => (
  <S.Wrapper px={{base: 0, lg: 6}}>
    <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
      Formulário Socioeconômico
    </Text>
    <FormQuestions buttonName="Salvar" questions={questions} />
  </S.Wrapper>
);

export default Form;
