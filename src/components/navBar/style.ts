import styled from 'styled-components';

export const Content = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;
  padding: 0 400px;
  background: #5cdb95;
  color: #edf5e1;

  button {
    background: #05386b;
    color: #edf5e1;
  }

  .user-info {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
