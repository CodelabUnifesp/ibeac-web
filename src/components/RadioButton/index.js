import React, { useState } from 'react';
import { CustomDiv, CustomLabel, RadioButton } from './styles';

const CustomRadio = (props) => {
    const [checked, setChecked] = useState(false)
    return(
        <CustomDiv width={props.width}>
        <RadioButton type='radio' checked={checked} name={props.name}/>
        <CustomLabel onClick={() => setChecked(true)}>{props.label}</CustomLabel>
        </CustomDiv>
    )
}

export default CustomRadio