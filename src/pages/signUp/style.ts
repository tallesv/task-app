import styled from 'styled-components';

export const Content = styled.div``;

export const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 100px 200px;

  background: #5cdb95;

  h3 {
    color: #edf5e1;
    margin-left: 200px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  box-shadow: 0px 10px 50px #555;
  background: #f0ffff;

  .unform {
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 5px;
    padding: 0px 10px;

    background: #ffff;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 5px 5px;
    }
    .two-inputs {
        display: flex;
        flex-direction: row;
      }
    }

    button {
      height: 60px;
      width: 300px;
      margin: 30px auto;
      background: #05386b;
      color: #edf5e1;
    }
  }
`;
