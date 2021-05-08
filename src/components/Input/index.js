import React from 'react';
import Input from './styles';

const CustomInput = (...props) => {
  const {placeholder} = props;
  return <Input placeholder={placeholder} />;
};

export default CustomInput;
