import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import localStorage from 'redux-persist/lib/storage';
import { login, logout } from '../redux/modules/authentication/actions';
import { IAuth } from '../redux/modules/authentication/types';
import { ITask, IUserTasks } from '../redux/modules/tasks/types';
import { IUser } from '../redux/modules/users/types';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  tasks: ITask[];
  signIn(credentials: SignInCredentials): Promise<void | string>;
  userLogout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [tasks, setTasks] = useState<ITask[]>({} as ITask[]);

  async function loadUser() {
    const dataFromLocalStorage = await localStorage.getItem('persist:root');
    if (dataFromLocalStorage) {
      const auth = JSON.parse(JSON.parse(dataFromLocalStorage).auth) as IAuth;
      if (auth.isLogged && auth.user) {
        setUser(auth.user);
      }
    }
  }

  const signIn = useCallback(
    async ({ email, password }) => {
      const dataFromLocalStorage = await localStorage.getItem('persist:root');
      if (dataFromLocalStorage) {
        const users = JSON.parse(JSON.parse(dataFromLocalStorage).users)
          .users as IUser[];
        const userToLogin = users.find(
          userToFind => userToFind.email === email,
        );

        if (userToLogin && userToLogin.password === password) {
          dispatch(login(userToLogin));
          setUser(userToLogin);
        }
        if (userToLogin && userToLogin.password !== password) {
          return 'error';
        }
      }
    },
    [dispatch],
  );

  const userLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    async function loadTasks() {
      const dataFromLocalStorage = await localStorage.getItem('persist:root');
      if (dataFromLocalStorage) {
        const tasksFromLocalStorage = JSON.parse(
          JSON.parse(dataFromLocalStorage).tasks,
        ).allTasks as IUserTasks[];
        const tasksFromUser = tasksFromLocalStorage.find(
          task => task.userId === user.id,
        );

        console.log(user.id);
        if (tasksFromUser) {
          setTasks(tasksFromUser.tasks);
        }
      }
    }
    loadUser();
    loadTasks();
  }, [user.id]);

  return (
    <AuthContext.Provider value={{ user, tasks, signIn, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}
