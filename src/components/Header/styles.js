import {Box} from '@chakra-ui/layout';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  box-shadow: 0px 0px 0.5rem 0px rgba(0, 0, 0, 0.25);
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
`;

export default {
  Container,
};
