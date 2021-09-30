import {Box} from '@chakra-ui/layout';
import styled from 'styled-components';
import media from '../../../media';

export const Container = styled(Box)`
  position: relative;
`;

export const Content = styled(Box)`
  display: flex;

  @media screen and (min-width: 62rem) {
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: auto;
    grid-template-areas: 'aside .';
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const BoxAside = styled(Box)`
  background: unset;
  grid-area: aside;
  padding-bottom: unset;
  ${media.mobile` 
    display: none;
    lg: flex;
  `};
`;

export default {
  Container,
  Content,
  BoxAside,
};
