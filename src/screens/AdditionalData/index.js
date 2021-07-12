import React, {useEffect, useState} from 'react';
import {Text} from '@chakra-ui/react';
import * as S from './styles';
import questions from './questions';
import FormQuestions from '../../components/elements/FormQuestions';
import {
  getById as userGetById,
  updateById as userUpdateById,
} from '../../domain/usuarios';

const Form = (...props) => {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userData')));
  const [aditionalData, setAditionalData] = useState(null);
  const [override, setOverride] = useState(true);

  useEffect(() => {
    async function fetchData() {
      debugger;
      const response = await userGetById(currentUser.id);
      await setAditionalData(response);
      await setOverride(false);
    }
    fetchData();
  }, [currentUser]);

  const handleSubmmit = async (data) => {
    await userUpdateById(currentUser.id, data);
  };

  return (
    <S.Wrapper px={{base: 0, lg: 6}}>
      <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Complemento de Dados
      </Text>
      {aditionalData && (
        <FormQuestions
          buttonName="Salvar"
          questions={questions}
          userAdicionalData={aditionalData}
          override={override}
          submitFunction={handleSubmmit}
        />
      )}
    </S.Wrapper>
  );
};

export default Form;
