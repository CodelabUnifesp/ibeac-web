import React, {useState} from 'react';
import {
  Text,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
} from '@chakra-ui/react';
import * as S from './styles';
import questions from './questions';

const Form = (...props) => {
  const buildQuestions = () => {
    const buildInput = (question) => {
      switch (question.type) {
        case 'text':
          return (
            <Input
              type={question.type}
              placeholder={question.placeholder ? question.placeholder : null}
            />
          );
        case 'radio':
          return (
            <RadioGroup>
              <Stack color="#000" spacing={4} direction="row">
                {question.alternatives
                  ? question.alternatives.map((alternative) => (
                      <Radio value={alternative.value}>
                        {alternative.value}
                      </Radio>
                    ))
                  : null}
              </Stack>
            </RadioGroup>
          );
        case 'select':
          return (
            <Select color="#000" spacing={4} direction="row">
              {question.alternatives
                ? question.alternatives.map((alternative) => (
                    <option value={alternative.value}>
                      {alternative.value}
                    </option>
                  ))
                : null}
            </Select>
          );
        default:
          return <></>;
      }
    };

    const buildedQuestions = questions.map((question) => (
      <FormControl id={question.name}>
        <FormLabel color="#000">{question.name}</FormLabel>
        {buildInput(question)}
      </FormControl>
    ));

    return buildedQuestions;
  };
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
          {questions ? buildQuestions() : null}
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit">
            Enviar
          </Button>
        </Stack>
      </Box>
    </S.Wrapper>
  );
};

export default Form;
