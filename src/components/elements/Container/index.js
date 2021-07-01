import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@chakra-ui/layout';

import {Wrapper} from './styles';

const Container = ({children, ...props} = {}) => (
  <Wrapper shadow="md" {...props}>
    {children}
  </Wrapper>
);

Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
