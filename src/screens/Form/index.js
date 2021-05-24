import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
      <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Formulário Socioeconômico
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
          {questions ? buildQuestions() : null}
          <Button
            colorScheme="primary"
            isLoading={props.isSubmitting}
            type="submit">
            Enviar
          </Button>
        </Stack>
      </Box>
    </S.Wrapper>
  );
};

Form.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default Form;
