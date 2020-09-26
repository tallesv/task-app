import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 300;
    margin: 10px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 300px;
  height: 300px;
  margin-top: 16px;
  border: 1px solid #5cdb95;
  border-radius: 5px;
  padding-top: 10px;

  div {
    padding: 10px 10px;
    p {
      margin: 5px 5px;
    }
  }

  .signin-button {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    button {
      background: #05386b;
      color: #edf5e1;
    }
  }
`;

export const RedirectToSignUp = styled.div`
  width: 300px;
  height: 50px;
  margin-top: 16px;
  border: 1px solid #5cdb95;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .link-to-signup {
    color: #0366d6;
  }
`;
