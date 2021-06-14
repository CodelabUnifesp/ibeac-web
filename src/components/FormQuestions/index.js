import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
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

const FormQuestions = ({buttonName, questions}) => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const buildQuestions = () => {
    const buildInput = (question) => {
      switch (question.type) {
        case 'text':
        case 'date':
          return (
            <Input
              color="black"
              type={question.type}
              placeholder={question.placeholder && question.placeholder}
              value={inputValue[question.id]}
              onInput={(event) =>
                setInputValue({
                  [question.id]: question.mask
                    ? event.target.value.replace(question.mask, '')
                    : event.target.value,
                })
              }
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
        <Button colorScheme="primary" isLoading={isLoading} type="submit">
          {buttonName}
        </Button>
      </Stack>
    </Box>
  );
};

FormQuestions.displayName = 'FormQuestions';
FormQuestions.defaultProps = {
  buttonName: 'Enviar',
  questions: [],
};

FormQuestions.propTypes = {
  buttonName: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      type: PropTypes.string.isRequired,
      mask: PropTypes.regex,
      alternatives: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

export default FormQuestions;
