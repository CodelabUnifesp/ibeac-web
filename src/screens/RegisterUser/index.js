import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import {
  Text,
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import {debounce, isEmpty, isNil, toInteger} from 'lodash';
import * as Yup from 'yup';

import {Icon} from '@mdi/react';
import {mdiAlertCircle, mdiCheckBold} from '@mdi/js';

import * as S from './styles';
import {uniqueUsername} from '../../domain/usuarios';

const RegisterUser = (...props) => {
  const [loading, setLoading] = useState(false);
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [userTypeData, setUserTypeData] = useState(null);

  const [checkingUsernameAvailability, setCheckingUsernameAvailability] =
    useState(false);
  const [usernameChecked, setUsernamedChecked] = useState(null);
  const latestCheckUniqueUsername = useRef(null);

  const schema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string()
        .required('O Nome de Usuário é obrigatório')
        .test(
          'checkUniqueUsername',
          <span>
            Esse nome de usuário <b>não</b> está disponível
          </span>,
          async (value) => {
            if (value === usernameChecked)
              return latestCheckUniqueUsername.current;

            setCheckingUsernameAvailability(true);

            if (!isEmpty(value) && !isNil(value)) {
              try {
                const {unique} = await uniqueUsername(value);

                setCheckingUsernameAvailability(false);
                setUsernamedChecked(value);
                latestCheckUniqueUsername.current = unique;
                return unique;
              } catch {
                alert(
                  'Não foi possível verificar a disponibilidade do nome de usuário',
                ); // TODO: transformar em alert amigável

                setUsernamedChecked(value);
                setCheckingUsernameAvailability(false);
                latestCheckUniqueUsername.current = true;
                return true;
              }
            }

            setCheckingUsernameAvailability(false);
            return false;
          },
        ),
      email: Yup.string().email('Insira um e-mail válido'),
      name: Yup.string().required('O Nome é obrigatório'),
      password: Yup.string().required('A Senha é obrigatória'),
      neighborhood: Yup.number().required('O Bairro é obrigatório'),
      userType: Yup.number().required('O Tipo é obrigatório'),
    });
  }, []);

  // FORM UPKEEPING
  const [errors, setErrors] = useState({});
  const setError = useCallback(
    (name, value) => {
      if (value === errors[name] || (isNil(value) && isNil(errors[name])))
        return;
      setErrors({...errors, [name]: value});
    },
    [setErrors, errors],
  );
  const numberOfErrors = useMemo(
    () =>
      Object.values(errors).filter((error) => !isEmpty(error) && !isNil(error))
        .length,
    [errors],
  );

  const [inputs, setInputs] = useState({});
  const setInput = useCallback(
    (name, value) => {
      setInputs({...inputs, [name]: value});
    },
    [setInputs, inputs],
  );

  const register = useCallback(
    (name) => {
      return {
        value: inputs[name] ?? '',
        onChange: (event) => {
          setInput(name, event.target.value);
        },
        onBlur: debounce(async (event) => {
          const {value} = event.target;

          try {
            const validation = await schema.validateAt(name, {[name]: value});
            setError(name, null);
          } catch (error) {
            setError(name, error.message);
          }
        }, 500),
      };
    },
    [schema, inputs, setInput, setError],
  );

  useEffect(() => {
    setLoading(true);
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

    setLoading(false);
  }, [setLoading]);

  const buildForm = useCallback(() => {
    return (
      <>
        <FormControl
          mb={4}
          isInvalid={!!errors.username}
          errortext={errors?.username}
          isRequired>
          <FormLabel color="#000">Nome de Usuário</FormLabel>
          <Input
            color="#000"
            {...register('username')}
            placeholder="Username"
          />

          {checkingUsernameAvailability ? (
            <FormHelperText
              display="flex"
              flexDirection="row"
              alignItems="center">
              <Spinner size="xs" colorScheme="primary" mr={2} />
              Verificando disponibilidade do nome de usuário
            </FormHelperText>
          ) : (
            <>
              {!isNil(errors.username) && !isEmpty(errors.username) ? (
                <FormErrorMessage>
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{errors.username}</AlertDescription>
                  </Alert>
                </FormErrorMessage>
              ) : (
                inputs.username === usernameChecked && (
                  <FormHelperText color="green.700">
                    <Alert status="success">
                      <AlertIcon />
                      <AlertDescription>
                        Esse nome de usuário está disponível
                      </AlertDescription>
                    </Alert>
                  </FormHelperText>
                )
              )}
            </>
          )}
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={!!errors?.email}
          errortext={errors?.email}>
          <FormLabel color="#000">E-mail</FormLabel>
          <Input
            color="#000"
            {...register('email')}
            placeholder="E-mail"
            type="email"
          />
          <FormErrorMessage>{errors?.email}</FormErrorMessage>
          {(isEmpty(inputs.email) || isNil(inputs.email)) && (
            <FormHelperText color="yellow.700">
              <Alert status="warning">
                <AlertIcon />
                <AlertDescription>
                  Caso o usuário não possua um e-mail cadastrado, qualquer
                  pedido de mudança de senha será encaminhado para a moderação
                  da plataforma.
                </AlertDescription>
              </Alert>
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mb={4} isInvalid={!!errors?.name} errortext={errors?.name}>
          <FormLabel color="#000">Nome</FormLabel>
          <Input color="#000" {...register('name')} placeholder="Nome" />
          <FormErrorMessage>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors?.name}</AlertDescription>
            </Alert>
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={!!errors?.password}
          errortext={errors?.password}>
          <FormLabel color="#000">Senha</FormLabel>
          <Input
            color="#000"
            {...register('password')}
            type="password"
            placeholder="Senha"
          />
          <FormErrorMessage>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors?.password}</AlertDescription>
            </Alert>
          </FormErrorMessage>
        </FormControl>

        {/* 
        <FormControl>
          <FormLabel color="#000">Bairro</FormLabel>
          <Select
            defaultValue="DEFAULT"
            color="#000"
            spacing={4}
            direction="row"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}>
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
            value={userType}
            onChange={(e) => setUserType(e.target.value)}>
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
        </FormControl> */}
      </>
    );
  }, [register, inputs, errors, checkingUsernameAvailability, usernameChecked]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      schema
        .validate(inputs, {abortEarly: false})
        .catch((err) => {
          console.log(
            'ALL ERRORS',
            err.inner.map((error) => [error.path, error.message]),
            err.inner.reduce(
              (obj, error) => ({...obj, [error.path]: error.message}),
              {},
            ),
          );
          setErrors(
            err.inner.reduce(
              (obj, error) => ({...obj, [error.path]: error.message}),
              {},
            ),
          );
        })
        .then((value) => {
          console.log('SUBMIT', value);
        });
    },
    [schema, inputs, setErrors],
  );

  console.log('ASDASDASD', errors);
  return (
    <S.Wrapper px={{base: 0, lg: 6}}>
      <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Cadastrar Novos Usuários
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
          <S.Form
            // eslint-disable-next-line react/jsx-no-bind
            onSubmit={onSubmit}
            autoComplete="off">
            {neighborhoodData && userTypeData ? (
              buildForm()
            ) : (
              <p>Ocorreu um erro ao buscar dados na api</p>
            )}
            <Tooltip
              isDisabled={numberOfErrors === 0 && !checkingUsernameAvailability}
              label={
                numberOfErrors > 0
                  ? 'Existem alguns problemas com os dados informados!'
                  : 'Verificando a disponibilidade do nome de usuário...'
              }>
              <span>
                <Button
                  disabled={numberOfErrors > 0 || checkingUsernameAvailability}
                  colorScheme="primary"
                  type="submit"
                  isLoading={loading}>
                  Cadastrar
                </Button>
              </span>
            </Tooltip>
          </S.Form>
        </Stack>
      </Box>
    </S.Wrapper>
  );
};

export default RegisterUser;
