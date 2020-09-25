import { Reducer } from 'redux';
import produce from 'immer';

import { IUsersSate, IUser } from './types';

const INITIAL_STATE: IUsersSate = {
  users: [],
};

const allUsers: Reducer<IUsersSate> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_USER': {
        const user = action.payload.user as IUser;

        draft.users.push(user);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default allUsers;
