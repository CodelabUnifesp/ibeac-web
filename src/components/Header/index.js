import React from 'react';
import { FiMenu } from 'react-icons/fi'
import { HeaderContainer } from './styles';

const Header = (props) => {
    return(
        <HeaderContainer>
            <FiMenu color="#2a778b"/>
            <p>IBEAPP</p>
        </HeaderContainer>
    )
}

export default Header