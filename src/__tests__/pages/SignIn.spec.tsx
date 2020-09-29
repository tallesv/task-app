import React from 'react';
import {
  render,
  fireEvent,
  queryByAttribute,
  waitFor,
} from '@testing-library/react';
import SignIn from '../../pages/signIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    const dom = render(<SignIn />);
    const { getByText } = dom;

    const getById = queryByAttribute.bind(null, 'id');

    const emailField = getById(dom.container, 'email-input');
    const passwordField = getById(dom.container, 'senha-input');
    const buttonElement = getByText('Fazer Login');

    if (emailField && passwordField) {
      fireEvent.change(emailField, {
        target: { value: 'johndoe@example.com' },
      });
      fireEvent.change(passwordField, { target: { value: '123456' } });
    }
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
