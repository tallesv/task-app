import styled from 'styled-components';

export const Content = styled.div``;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 800px;

  padding: 100px 200px;

  background: #5cdb95;

  span {
    color: #edf5e1;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  height: 600px;
  border-radius: 5px;

  background: #f0ffff;

  .unform {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    width: 1000px;
    height: 600px;
    border-radius: 5px;
    padding: 0px 10px;

    background: #ffff;

    div {
      display: flex;
      flex-wrap: wrap;
      margin: 5px 5px;

      p {
        margin: 0 13px;
      }
    }

    .endereço {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      div + div {
        padding-right: 20px;
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
