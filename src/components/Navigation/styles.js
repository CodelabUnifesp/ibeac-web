import styled from 'styled-components';

import {Box, MenuItem as CMenuItem} from '@chakra-ui/react';

export const MenuItem = styled(CMenuItem)`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-start;
  color: #333;

  &:focus {
    background: var(--chakra-colors-primary-400);
    color: black;
  }

  &.selected {
    background: var(--chakra-colors-light-50);
    color: var(--chakra-colors-primary-600);
    font-weight: bold;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--chakra-colors-light-100);
  }
`;

export default {
  MenuItem,
};
