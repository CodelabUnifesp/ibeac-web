import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #f0f6f8;
  height: 100%;
  width: 100%;
`;

export const Logo = styled.div`
  width: 100%;
  text-align: center;
  h1 {
    font-family: Montserrat;
    font-size: 40px;
    font-weight: bold;
    color: #31788a;
    line-height: 1;
  }
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    span {
      font-weight: 600;
      font-family: 'Nunito Sans';
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      margin-top: 5px;
    }
  }
`;

export const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    color: #31788a;
    font-weight: 600;
    font-family: 'Nunito Sans';
    font-size: 18px;
  }
  input {
    background: rgba(0, 0, 0, 0);
    border: 1px solid #b4b4b4;
    border-radius: 5px;
    height: 48px;
    width: 100%;
    padding: 0 15px;
    color: #000;
    font-size: 18px;
    &::placeholder {
      color: #b4b4b4;
    }
  }
`;
