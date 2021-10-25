import React, {useState, useContext} from 'react';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {Box} from '@chakra-ui/layout';
import {FormLabel, Button, Link} from '@chakra-ui/react';

import {conforms, has, omit} from 'lodash';
import {Container, Content, Logo, FormField} from './styles';
import {Context as AuthContext} from '../../components/stores/Auth';

import resetPassword from '../../domain/resetPassword';

const schema = Yup.object().shape({
  user: Yup.string().required('O nome de usuário/e-mail é obrigatório'),
});

const RecoverPassword = (...props) => {
  const [loading, setLoading] = useState(false);

  async function handleRecoverPassword(params) {
    setLoading(true);
    try {
      const {data} = await resetPassword(params);

      alert(data);
    } catch (error) {
      alert('Erro interno!');
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
          <Form
            schema={schema}
            onSubmit={handleRecoverPassword}
            autoComplete="off">
            <FormField>
              <div style={{textAlign: 'left', marginBottom: 24}}>
                Informe seu nome de usuário ou e-mail. Sua senha vai ser
                redefinida, e a nova senha vai ser enviada para o e-mail
                cadastrado no momento de criação do usuário (caso você não
                possua um e-mail, contate um administrador para recuperar sua
                nova senha)
              </div>
              <Input
                name="user"
                type="text"
                placeholder="Seu nome de usuário ou e-mail"
              />
            </FormField>

            <Button
              color="#FFF"
              bgColor="#31788A"
              _hover={{bg: '#31788A'}}
              size="lg"
              mt={4}
              isLoading={loading}
              type="submit">
              Redefinir senha
            </Button>
          </Form>
        </Content>
      </Box>
    </Container>
  );
};

export default RecoverPassword;
