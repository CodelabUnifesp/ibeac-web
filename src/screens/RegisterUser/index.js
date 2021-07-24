import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
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
  AlertDescription,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import {debounce, isEmpty, isNil} from 'lodash';
import * as Yup from 'yup';

import * as S from './styles';
import * as Usuario from '../../domain/usuarios';
import * as Bairro from '../../domain/bairros';

import {Context as AuthContext} from '../../components/stores/Auth';

const RegisterUser = (...props) => {
  const {token} = useContext(AuthContext);
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
            setCheckingUsernameAvailability(true);

            if (!isEmpty(value) && !isNil(value)) {
              try {
                const unique = await Usuario.verifyUsername(token, value);

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
  }, [token]);

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

  const [inputs, setInputs] = useState({});
  const setInput = useCallback(
    (name, value) => {
      setInputs({...inputs, [name]: value});
    },
    [setInputs, inputs],
  );

  const register = useCallback(
    (name, {validateOn = 'onBlur', defaultValue = ''} = {}) => {
      const handleValidation = debounce(async (event) => {
        const {value} = event.target;

        try {
          await schema.validateAt(name, {[name]: value});
          setError(name, null);
        } catch (error) {
          setError(name, error.message);
        }
      }, 500);

      const inputProps = {
        value: inputs[name] ?? defaultValue,
        onChange: (event) => {
          setInput(name, event.target.value);
        },
      };

      if (validateOn === 'onBlur') inputProps.onBlur = handleValidation;
      else if (validateOn === 'onChange')
        inputProps.onChange = (event) => {
          setInput(name, event.target.value);
          handleValidation(event);
        };

      return inputProps;
    },
    [schema, inputs, setInput, setError],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isNil(token) || isEmpty(token)) return;
    setLoading(true);

    const neighborhoodDataObject = await Bairro.getAll(token);

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
  }, [token, setLoading]);

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
          <FormErrorMessage>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.email}</AlertDescription>
            </Alert>
          </FormErrorMessage>
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

        <FormControl
          mb={4}
          isInvalid={!!errors?.neighborhood}
          errortext={errors?.neighborhood}>
          <FormLabel color="#000">Bairro</FormLabel>
          <Select
            color="#000"
            spacing={4}
            direction="row"
            {...register('neighborhood', {
              validateOn: 'onChange',
              defaultValue: 'DEFAULT',
            })}>
            <option value="DEFAULT" disabled>
              Selecione uma opção
            </option>
            {neighborhoodData
              ? neighborhoodData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              : null}
          </Select>

          <FormErrorMessage>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors?.neighborhood}</AlertDescription>
            </Alert>
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mb={4}
          isInvalid={!!errors?.userType}
          errortext={errors?.userType}>
          <FormLabel color="#000">Tipo</FormLabel>
          <Select
            color="#000"
            spacing={4}
            direction="row"
            {...register('userType', {
              validateOn: 'onChange',
              defaultValue: 'DEFAULT',
            })}>
            <option value="DEFAULT" disabled>
              Selecione uma opção
            </option>
            {userTypeData
              ? userTypeData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))
              : null}
          </Select>

          <FormErrorMessage>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors?.userType}</AlertDescription>
            </Alert>
          </FormErrorMessage>
        </FormControl>
      </>
    );
  }, [
    register,
    inputs,
    errors,
    checkingUsernameAvailability,
    usernameChecked,
    userTypeData,
    neighborhoodData,
  ]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      schema
        .validate(inputs, {abortEarly: false})
        .then((value) => {
          Usuario.create(token, value)
            .then(() => {
              setErrors({});
              setInputs({});
            })
            .catch(() => {
              alert('Não foi possível criar o usuário.'); // TODO: alert mais amigável com melhor descricao do erro
            });
        })
        .catch((err) => {
          setErrors(
            err.inner.reduce(
              (obj, error) => ({...obj, [error.path]: error.message}),
              {},
            ),
          );
        });
    },
    [token, schema, inputs, setErrors, setInputs],
  );

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
              isDisabled={!checkingUsernameAvailability}
              label="Verificando a disponibilidade do nome de usuário...">
              <span>
                <Button
                  disabled={checkingUsernameAvailability}
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
