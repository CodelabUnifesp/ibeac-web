import React, {useState, useEffect} from 'react';
import {
  Text,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import {toInteger} from 'lodash';
import * as S from './styles';

const RegisterUser = (...props) => {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [userTypeData, setUserTypeData] = useState(null);
  const [formName, setFormName] = useState(null);
  const [formEmail, setFormEmail] = useState(null);
  const [formNeighborhood, setFormNeighborhood] = useState(null);
  const [formUserType, setFormUserType] = useState(null);
  let formPassword = null;

  useEffect(() => {
    // Constante deverá vir da Api
    const neighborhoodDataObject = [
      {
        id: 1,
        text: 'Satélite',
      },
      {
        id: 2,
        text: 'Santa Inês',
      },
      {
        id: 3,
        text: 'Centro',
      },
    ];
    // Constante deverá vir da Api
    const userTypeDataObject = [
      {
        id: 1,
        type: 'Administrador',
      },
      {
        id: 2,
        type: 'Moderador',
      },
      {
        id: 3,
        type: 'Comum',
      },
    ];
    setNeighborhoodData(neighborhoodDataObject);
    setUserTypeData(userTypeDataObject);
  }, []);

  const buildForm = () => {
    const min = 1;
    const randomPassword = toInteger(min + Math.random() * 1000000);
    formPassword = randomPassword;
    return (
      <>
        <FormControl id="name">
          <FormLabel color="#000">Nome</FormLabel>
          <Input
            color="#000"
            placeholder="nome.sobrenome"
            onChange={(e) => setFormName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel color="#000">Email</FormLabel>
          <Input
            color="#000"
            placeholder="email"
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel color="#000">Senha</FormLabel>
          <Input color="#000" placeholder={randomPassword} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color="#000">Bairro</FormLabel>
          <Select
            defaultValue="DEFAULT"
            color="#000"
            spacing={4}
            direction="row"
            onChange={(e) => setFormNeighborhood(e.target.value)}>
            <option value="DEFAULT" disabled>
              Selecione uma opção
            </option>
            {neighborhoodData
              ? neighborhoodData.map((item) => (
                  <option key={item.id} value={item.text}>
                    {item.text}
                  </option>
                ))
              : null}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="#000">Tipo</FormLabel>
          <Select
            defaultValue="DEFAULT"
            color="#000"
            spacing={4}
            direction="row"
            onChange={(e) => setFormUserType(e.target.value)}>
            <option value="DEFAULT" disabled>
              Selecione uma opção
            </option>
            {userTypeData
              ? userTypeData.map((item) => (
                  <option key={item.id} value={item.type}>
                    {item.type}
                  </option>
                ))
              : null}
          </Select>
        </FormControl>
      </>
    );
  };

  const submitForm = () => {
    alert(
      `${formName} \n ${formEmail} \n ${formPassword} \n ${formNeighborhood} \n ${formUserType}`,
    );
  };

  return (
    <S.Wrapper px={{base: 0, lg: 6}}>
      <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Adicionar usuário
      </Text>
      <Box
        borderRadius={10}
        bg={{base: 'white', lg: 'white'}}
        color={{base: 'white', lg: 'white'}}
        boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25)">
        <Stack
          mx={12}
          my={10}
          spacing={4}
          align="flex-start"
          justify="center"
          direction="column">
          {neighborhoodData && userTypeData ? (
            buildForm()
          ) : (
            <p>Ocorreu um erro ao buscar dados na api</p>
          )}
          <Button
            colorScheme="primary"
            type="submit"
            onClick={() => {
              submitForm();
            }}>
            Adicionar
          </Button>
        </Stack>
      </Box>
    </S.Wrapper>
  );
};

export default RegisterUser;
