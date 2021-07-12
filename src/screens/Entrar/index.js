import React, {useState, useContext} from 'react';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {Box} from '@chakra-ui/layout';
import {FormLabel, Button, Link} from '@chakra-ui/react';

import {conforms, has} from 'lodash';
import {Container, Content, Logo, FormField} from './styles';
import {Context as AuthContext} from '../../components/stores/Auth';

import login from '../../domain/login';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function Entrar({history} = {}) {
  const [loading, setLoading] = useState(false);
  const {
    token: [, setToken],
  } = useContext(AuthContext);

  async function handleLogin(params) {
    try {
      setLoading(true);
      const {data} = await login(params);

      if (data.status === 1000) {
        if (has(data, 'token') || true) {
          // TODO: token ainda não foi implementado na API, então nao vai estar retornando aqui
          // token EXPIRADO: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGFzbWVkaXMtYXBpLWRldiIsImlhdCI6MTYyNDIyMDY5MiwiZXhwIjoxNjI0OTExODkyLCJhdWQiOiIiLCJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGxhc21lZGlzLmNvbSIsInJlYWxfbmFtZSI6IkpvaG4gRG9lIiwidXNlcl90eXBlIjoxLCJhdmF0YXIiOm51bGx9.zp79IVQXHb_8SQe_Nc1GJmYzwOPXwo94rjpeW2rTS6M
          // token valido até 2022 (para teste): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGFzbWVkaXMtYXBpLWRldiIsImlhdCI6MTYyNDIyMDY5MiwiZXhwIjo3OTY3Nzk1MDkyLCJhdWQiOiIiLCJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGxhc21lZGlzLmNvbSIsInJlYWxfbmFtZSI6IkpvaG4gRG9lIiwidXNlcl90eXBlIjoiMSIsImF2YXRhciI6Im51bGwifQ.SJZkk_13zZfX2v6AgZmCSd0hSjgNpbaoHfcAzwMEC6w

          setToken(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGFzbWVkaXMtYXBpLWRldiIsImlhdCI6MTYyNDIyMDY5MiwiZXhwIjo3OTY3Nzk1MDkyLCJhdWQiOiIiLCJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGxhc21lZGlzLmNvbSIsInJlYWxfbmFtZSI6IkpvaG4gRG9lIiwidXNlcl90eXBlIjoiMSIsImF2YXRhciI6Im51bGwifQ.SJZkk_13zZfX2v6AgZmCSd0hSjgNpbaoHfcAzwMEC6w',
          );

          localStorage.setItem('userData', JSON.stringify(data));

          history.push({
            pathname: '/',
            state: data,
          });
        } else {
          toast.error('Login não retornou token!');
        }
      } else {
        toast.error('Usuário ou senha incorretos!');
      }
    } catch (error) {
      toast.error('Erro interno!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Box
        p={['20px', '60px', '80px']}
        h="max-content"
        maxWidth="600px"
        w="90%"
        mt={20}
        borderRadius="10px"
        shadow="md"
        bgColor="white">
        <Logo>
          <h1>IBEApp</h1>
        </Logo>

        <Content>
          <Form schema={schema} onSubmit={handleLogin} autoComplete="off">
            <FormField>
              <FormLabel>E-mail</FormLabel>
              <Input name="email" type="email" placeholder="Seu e-mail" />
            </FormField>

            <FormField>
              <FormLabel>Senha</FormLabel>
              <Input name="password" type="password" placeholder="Sua senha" />
              <Link
                color="#31788A"
                fontWeight="bold"
                fontFamily="Nunito Sans"
                fontSize="18px"
                textAlign="right"
                mt="10px"
                href="/recover">
                Esqueceu a senha?
              </Link>
            </FormField>

            <Button
              color="#FFF"
              bgColor="#31788A"
              _hover={{bg: '#31788A'}}
              size="lg"
              mt={4}
              isLoading={loading}
              type="submit">
              Entrar
            </Button>
          </Form>
        </Content>
      </Box>
    </Container>
  );
}

export default Entrar;
