import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  color: black;
  height: 24px;
  padding: 5px 0;
  outline: none;
  width: 100%;

  &::placeholder {
    color: gray;
  }

  &:active,
  &:focus {
    border-bottom: 2px solid #2a778b;
  }
`;

export default Input;
