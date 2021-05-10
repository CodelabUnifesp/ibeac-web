import {Box} from '@chakra-ui/layout';
import styled from 'styled-components';

export const Container = styled(Box)`
  position: relative;
`;

export const Content = styled(Box)`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

export default {
  Container,
  Content,
};
