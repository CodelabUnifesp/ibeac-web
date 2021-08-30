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
  Checkbox,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import {isNil} from 'lodash';
import decodeDate from '../../../utils/decodeDate';

const FormQuestions = ({
  buttonName,
  questions,
  userAdicionalData,
  override,
  submitFunction,
}) => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const buildInput = (question) => {
    if (userAdicionalData && override) {
      if (userAdicionalData[question.nameFromApi]) {
        if (question.type === 'date') {
          const dateDecoded = decodeDate(userAdicionalData.nascimento);
          inputValue[question.id] = dateDecoded;
        } else {
          inputValue[question.id] = userAdicionalData[question.nameFromApi];
        }
      }
    }
    switch (question.type) {
      case 'text':
      case 'date':
        return (
          <Input
            color="black"
            type={question.type}
            as={!isNil(question.mask) ? InputMask : undefined}
            mask={question.mask}
            maskChar={null}
            placeholder={question.placeholder && question.placeholder}
            value={inputValue[question.id]}
            onInput={(event) =>
              setInputValue({
                ...inputValue,
                [question.id]: question.forbiddenCharacters
                  ? event.target.value.replace(question.forbiddenCharacters, '')
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
                ? question.alternatives.map((alternative) => {
                    return (
                      <Radio
                        onChange={(event) => {
                          console.log(event.target.value);
                          setInputValue({
                            ...inputValue,
                            [question.id]: event.target.value,
                          });
                        }}
                        value={alternative.value}>
                        {alternative.value}
                      </Radio>
                    );
                  })
                : null}
            </Stack>
          </RadioGroup>
        );
      case 'select':
        return (
          <Select
            onChange={(event) =>
              setInputValue({
                ...inputValue,
                [question.id]: event.target.value,
              })
            }
            color="#000"
            spacing={4}
            direction="row">
            {question.alternatives
              ? question.alternatives.map((alternative) => (
                  <option
                    selected={alternative.value === inputValue[question.id]}
                    value={alternative.value}>
                    {alternative.value}
                  </option>
                ))
              : null}
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            isChecked={inputValue[question.id]}
            onChange={async (event) => {
              await setInputValue({
                ...inputValue,
                [question.id]: event.target.checked,
              });
              console.log(inputValue);
            }}
            color="#000"
            spacing={4}
            direction="row"
          />
        );
      default:
        return <></>;
    }
  };

  const buildQuestions = () => {
    const buildedQuestions = questions.map((question) => {
      return (
        <FormControl id={question.name}>
          <FormLabel color="#000">{question.name}</FormLabel>
          {buildInput(question)}
        </FormControl>
      );
    });
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
        {questions && buildQuestions()}
        <Button
          colorScheme="primary"
          isLoading={isLoading}
          type="submit"
          onClick={() => submitFunction(inputValue)}>
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
