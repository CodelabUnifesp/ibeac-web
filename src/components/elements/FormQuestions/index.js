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
  Text,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import {isNil} from 'lodash';
import decodeDate from '../../../utils/decodeDate';

const FormQuestions = ({
  buttonName,
  questions,
  userAdditionalData,
  override,
  submitFunction,
}) => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading] = useState(false);

  const getQuestionIndexByName = (nameFromApi) => {
    const question = questions.find((q) => q.nameFromApi === nameFromApi);
    return question ? question.id : -1;
  };

  const questionsToValidateQuantity = [
    'qtd_pessoas',
    'qtd_criancas',
    'qtd_gestantes',
    'qtd_amamentando',
    'qtd_criancas_deficiencia',
  ];

  const totalIndex = getQuestionIndexByName(questionsToValidateQuantity[0]);
  const kidsIndex = getQuestionIndexByName(questionsToValidateQuantity[1]);
  const pregnantIndex = getQuestionIndexByName(questionsToValidateQuantity[2]);
  const breastfeedingIndex = getQuestionIndexByName(
    questionsToValidateQuantity[3],
  );
  const deficiencyIndex = getQuestionIndexByName(
    questionsToValidateQuantity[4],
  );

  const validateQuantity = (question, value) => {
    if (!questionsToValidateQuantity.includes(question.nameFromApi)) {
      return true;
    }

    const values = inputValue;
    values[question.id] = value;

    const total = parseInt(values[totalIndex] || 0, 10);
    const kids = parseInt(values[kidsIndex] || 0, 10);
    const pregnant = parseInt(values[pregnantIndex] || 0, 10);
    const breastfeeding = parseInt(values[breastfeedingIndex] || 0, 10);
    const deficiency = parseInt(values[deficiencyIndex] || 0, 10);

    if (
      kids >= total ||
      pregnant >= total ||
      breastfeeding >= total ||
      deficiency >= total
    )
      return false;

    if (
      kids + pregnant > total ||
      kids + breastfeeding > total ||
      deficiency + pregnant > total ||
      deficiency + breastfeeding > total
    )
      return false;

    return true;
  };

  const buildInput = (question) => {
    if (userAdditionalData && override) {
      if (userAdditionalData[question.nameFromApi] !== undefined) {
        if (question.type === 'date') {
          const dateDecoded = userAdditionalData.nascimento
            ? decodeDate(userAdditionalData.nascimento)
            : null;
          inputValue[question.id] = dateDecoded;
        } else {
          inputValue[question.id] = userAdditionalData[question.nameFromApi];
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
            onInput={(event) => {
              const formattedValue = question.forbiddenCharacters
                ? event.target.value.replace(question.forbiddenCharacters, '')
                : event.target.value;

              if (validateQuantity(question, formattedValue)) {
                setInputValue({
                  ...inputValue,
                  [question.id]: formattedValue,
                });
              } else {
                setInputValue({
                  ...inputValue,
                  [question.id]: null,
                });
                alert(
                  'A quantidade informada não está de acordo com o total informado de pessoas na família',
                );
              }
            }}
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
            direction="row"
            value={inputValue[question.id]}>
            {question.alternatives
              ? question.alternatives.map((alternative) => (
                  <option value={alternative.value}>{alternative.value}</option>
                ))
              : null}
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            isChecked={inputValue[question.id]}
            onChange={async (event) => {
              setInputValue({
                ...inputValue,
                [question.id]: event.target.checked,
              });
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
        <FormControl id={question.name} key={question.id}>
          <FormLabel color="#000" display="flex" style={{gap: '5px'}}>
            {question.name}
            {question.type === 'checkbox' ? null : <Text color="red">*</Text>}
          </FormLabel>
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

        <Text color="red"> * preenchimento obrigatório </Text>
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
  userAdditionalData: {},
  override: true,
  submitFunction: () => {},
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
  userAdditionalData: PropTypes.shape({
    nascimento: PropTypes.string,
  }),
  override: PropTypes.bool,
  submitFunction: PropTypes.func,
};

export default FormQuestions;
