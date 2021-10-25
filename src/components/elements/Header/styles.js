import {Box} from '@chakra-ui/layout';
import styled from 'styled-components';
import media from '../../../media';

export const Wrapper = styled(Box)`
  width: 100%;
  box-shadow: 0px 0px 0.5rem 0px rgba(0, 0, 0, 0.5);
  ${media.mobile` 
    position: sticky;
    top: 0px;
    z-index: 2;
    box-shadow: none;
  `};
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

export const ChildrenWrapper = styled(Box)`
  position: sticky;
  top: 60px;
  z-index: 2;
`;

export default {
  Container,
  ChildrenWrapper,
};
