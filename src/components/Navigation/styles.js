import styled from 'styled-components';

import {Box, MenuItem as CMenuItem} from '@chakra-ui/react';

export const MenuItem = styled(CMenuItem)`
  justify-content: 'center';

  &:focus {
    background: var(--chakra-colors-primary-400);
    color: 'black';
  }
`;

export default {
  MenuItem,
};
