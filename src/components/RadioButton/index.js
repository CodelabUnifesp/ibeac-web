import React, {useState} from 'react';
import {CustomDiv, CustomLabel, RadioButton} from './styles';

const CustomRadio = (props) => {
  const {width, name, label} = props;
  const [checked, setChecked] = useState(false);
  return (
    <CustomDiv width={width}>
      <RadioButton type="radio" checked={checked} name={name} />
      <CustomLabel onClick={() => setChecked(true)}>{label}</CustomLabel>
    </CustomDiv>
  );
};

export default CustomRadio;
