import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin: 10px;
    color: #5cdb95;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 600px;
  height: 280px;
  margin-top: 16px;
  border-radius: 10px;
  box-shadow: 0px 10px 10px #555;
  padding-top: 10px;

  .unform {
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 5px;
    padding: 0px 10px;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 5px 5px;

      input {
        width: 92%;
      }
    }

    .signin-button {
      display: flex;
      flex-direction: column;
      margin: 20px 20px;
      button {
        background: #05386b;
        color: #edf5e1;
      }
    }
  }
`;

export const RedirectToSignUp = styled.div`
  width: 600px;
  height: 50px;
  border-radius: 10px;
  box-shadow: 0px 10px 10px #555;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .link-to-signup {
    color: #0366d6;
  }
`;
