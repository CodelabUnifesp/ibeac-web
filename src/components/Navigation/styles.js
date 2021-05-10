import styled from 'styled-components';

import {Box, MenuItem as CMenuItem} from '@chakra-ui/react';

export const MenuItem = styled(CMenuItem)`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-start;
  color: #eee;

  @media screen and (min-width: 68rem) {
    color: #333;
  }

  &:focus {
    background: var(--chakra-colors-primary-400);
    color: black;
  }

  &.selected {
    font-weight: bold;
    border-top: 1px solid;
    border-bottom: 1px solid;
    background: var(--chakra-colors-primary-700);
    color: white;
    border-color: var(--chakra-colors-primary-500);

    @media screen and (min-width: 68rem) {
      background: var(--chakra-colors-light-50);
      color: var(--chakra-colors-primary-600);
      border-color: var(--chakra-colors-light-100);
    }
  }

  @media screen and (max-width: 67rem) {
    & .icon {
      display: none !important;
    }
  }
`;

export default {
  MenuItem,
};
