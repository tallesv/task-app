import { IUser } from '../users/types';

export function login(user: IUser) {
  return {
    type: 'Login',
    payload: {
      user,
    },
  };
}

export function logout() {
  return {
    type: 'Logout',
  };
}
