import styled from 'styled-components';

export const CustomDiv = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 24px;
  justify-content: center;
  padding: 5px;
  position: relative;
  width: ${(props) => (props.width ? props.width : '100%')};
`;

export const CustomLabel = styled.label`
  display: inline-block;
  padding-left: 30px;
  cursor: pointer;
  position: relative;

  &:before {
    border: 2px solid gray;
    border-radius: 50%;
    content: '';
    height: 16px;
    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    transition: 0.28s ease;
    width: 16px;
    z-index: 0;
  }

  &:after {
    background-color: white;
    border: 1px solid white;
    border-radius: 50%;
    content: '';
    height: 16px;
    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    transform: scale(0.5);
    transition: 0.28s ease;
    width: 16px;
    z-index: 0;
  }
`;

export const RadioButton = styled.input`
  margin: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;

  &:checked + label:before {
    border: 2px solid #2a778b;
  }

  &:checked + label:after {
    background-color: #2a778b;
    border: 2px solid #2a778b;
  }
`;
