import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffff;
  border-radius: 10px;
  border: 2px solid;
  padding: 5px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #5cdb95;
      border-color: #5cdb95;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #5cdb95;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
