import React from 'react';
import PropTypes from 'prop-types';
import BodyContainer from './styles';

const Body = ({children} = {}) => <BodyContainer>{children}</BodyContainer>;

Body.displayName = 'Body';
Body.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Body;
