import { IUser } from '../users/types';

export interface IAuth {
  isLogged: boolean;
  user?: IUser;
}
