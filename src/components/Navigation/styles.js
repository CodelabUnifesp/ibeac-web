import styled from 'styled-components';

import {Menu as CMenu} from '@chakra-ui/react';

export const Menu = styled(CMenu)`
  align-items: flex-start;
`;

export const Divider = styled.div`
  width: 100%;
  height: var(--chakra-space-8);
`;

export default {
  Menu,
  Divider,
};
