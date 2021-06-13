import React, {useState} from 'react';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {Box} from '@chakra-ui/layout';
import {FormLabel, Button, Link} from '@chakra-ui/react';

import {Container, Content, Logo, FormField} from './styles';

import login from '../../domain/login';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function Login({history} = {}) {
  const [loading, setLoading] = useState(false);

  async function handleLogin(params) {
    try {
      setLoading(true);
      const {data} = await login(params);
      if (data.status === 1000) {
        setLoading(false);
        history.push({
          pathname: '/home',
          state: data,
        });
      } else {
        toast.error('usuário ou senha incorretos!');
        setLoading(false);
      }
    } catch (error) {
      toast.error('erro interno!');
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

export default Login;
