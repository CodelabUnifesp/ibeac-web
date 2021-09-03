import React, {useContext, useState, useEffect} from 'react';
import {Text} from '@chakra-ui/react';
import * as S from './styles';
import questions from './questions';
import FormQuestions from '../../components/elements/FormQuestions';
import {
  getById as getFormDataByUserId,
  updateById as updateFormByUserId,
} from '../../domain/formSocio';
import {Context as AuthContext} from '../../components/stores/Auth';

const Form = (...props) => {
  const {user, token} = useContext(AuthContext);
  const [aditionalData, setAditionalData] = useState(null);
  const [override, setOverride] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getFormDataByUserId(user.id, token);
      await setAditionalData(response);
      await setOverride(false);
    }
    fetchData();
  }, [user]);

  const handleSubmmit = async (data) => {
    await updateFormByUserId(user.id, token, data);
  };

  return (
    <S.Wrapper px={{base: 0, lg: 6}}>
      <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Formulário Socioeconômico
      </Text>
      <FormQuestions
        buttonName="Salvar"
        questions={questions}
        userAdicionalData={aditionalData}
        override={override}
        submitFunction={handleSubmmit}
      />
    </S.Wrapper>
  );
};

export default Form;
