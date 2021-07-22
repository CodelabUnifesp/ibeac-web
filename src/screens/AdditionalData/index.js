import React, {useEffect, useState, useContext} from 'react';
import {Text} from '@chakra-ui/react';
import * as S from './styles';
import questions from './questions';
import FormQuestions from '../../components/elements/FormQuestions';
import {
  getById as userGetById,
  updateById as userUpdateById,
} from '../../domain/usuarios';
import {Context as AuthContext} from '../../components/stores/Auth';

const Form = (...props) => {
  const {user, token} = useContext(AuthContext);
  const [aditionalData, setAditionalData] = useState(null);
  const [override, setOverride] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await userGetById(token, user.id);
      await setAditionalData(response);
      await setOverride(false);
    }
    fetchData();
  }, [user, token]);

  const handleSubmmit = async (data) => {
    await userUpdateById(token, user.id, data);
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
