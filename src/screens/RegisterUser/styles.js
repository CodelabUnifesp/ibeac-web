import styled from 'styled-components';
import {Box} from '@chakra-ui/layout';
import {Text as CText} from '@chakra-ui/react';
import {Form as RockseatForm} from '@rocketseat/unform';

export const Wrapper = styled(Box)`
  display: grid;
  grid-template-rows: auto auto;
`;

export const Text = styled(CText)`
  color: ${(props) => (props.color ? props.color : '#000')};
`;

export const Content = styled.div`
  width: 60%;
  background-color: #ffffff;
`;

export const Form = styled.form`
  width: 100%;
`;
