import React from 'react';
import {
  Text,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import * as S from './styles';

const Form = () => {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }
  return (
    <S.Wrapper px={{base: 0, lg: 6}}>
      <Text color="#2f7384" fontSize="2xl">
        Formulário Socioeconômico
      </Text>
      <Box
        bg={{base: 'white', lg: 'white'}}
        color={{base: 'white', lg: 'white'}}
        boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25)">
        <Stack
          margin="20px 10%"
          spacing={2}
          align="flex-start"
          justify="center"
          direction="column">
          <FormControl id="email">
            <FormLabel color="#000">
              Nome completo da representante da família (sem abreviações)
            </FormLabel>
            <Input type="email" placeholder="Nome completo" />
          </FormControl>
        </Stack>
      </Box>
    </S.Wrapper>
  );
};

export default Form;
