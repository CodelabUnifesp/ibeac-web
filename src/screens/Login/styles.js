import styled from 'styled-components';
import {ToastContainer} from 'react-toastify';
import {darken} from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  height: 100vh;
  width: 100wh;
`;

export const Toast = styled(ToastContainer)`
  .Toastify__toast--error {
    background: blue;
    background-color: red;
  }
`;

export const Logo = styled.div`
  width: 100%;
  text-align: center;
  h1 {
    font-size: 55px;
    font-weight: bold;
    color: #31788a;
  }
`;
export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #31788a;
      font-weight: bold;
      margin: 0 0 10px;
      &::placeholder {
        color: #31788a;
        font-weight: bold;
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #31788a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#31788A')};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
