import styled from 'styled-components';

export const Container = styled.div``;

export const AddTask = styled.div`
  margin: 50px;

  .unform {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .task-input {
    width: 300px;
  }

  button {
    background: #05386b;
    color: #edf5e1;
  }
`;

export const Tasks = styled.div`
  margin: 50px;

  .tasks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    height: 80px;
    border: 3px solid;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;

    div {
      margin: 0 10px;
    }
  }
`;
