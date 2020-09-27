import { Reducer } from 'redux';
import { IAuth } from './types';
import { IUser } from '../users/types';

const INITIAL_STATE: IAuth = {
  isLogged: false,
};

const auth: Reducer<IAuth> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'Login': {
      const user = action.payload.user as IUser;

      return {
        isLogged: true,
        user,
      };

      break;
    }

    case 'Logout': {
      return {
        isLogged: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
