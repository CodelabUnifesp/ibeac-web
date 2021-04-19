import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"

import api from "../../services/api";

import { Container, Content, Logo, Toast } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha obrigatória"),
});

function Login({ history }) {
  const [loading, setLoading] = useState(false)

  async function handleLogin(params) {
   try {
    setLoading(true)
    const { data } = await api.post("login", params);
    if (data.status === 1000) {
      setLoading(false)
      history.push({
        pathname: "/home",
        state: data,
      });
    } else {
      toast.error("usuário ou senha incorretos!")
      setLoading(false)
    }
   } catch (error) {
    toast.error("erro interno!")
   }
  }

  return (
    <Container>
      <Content>
        <Logo>
          <h1>IBeapp</h1>
        </Logo>
        <Form schema={schema} onSubmit={handleLogin} autoComplete="off">
          <Input name="email" type="email" placeholder="seu email"/>
          <Input name="password" type="password" placeholder="sua senha" />
          <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
          <Toast />
        </Form>
      </Content>
    </Container>
  );
}

export default Login;
