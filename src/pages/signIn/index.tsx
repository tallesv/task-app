import React, { useRef, useCallback, useContext } from 'react';
import { Button } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';
import localStorage from 'redux-persist/lib/storage';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../../components/input';

import { Container, Form, RedirectToSignUp } from './style';
import getValidationErrors from '../../utils/getValidationErrors';
import { IUser } from '../../redux/modules/users/types';
import { login } from '../../redux/modules/authentication/actions';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = useCallback(
    (user: IUser) => {
      dispatch(login(user));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const dataFromLocalStorage = await localStorage.getItem('persist:root');
      if (dataFromLocalStorage) {
        const users = JSON.parse(JSON.parse(dataFromLocalStorage).users)
          .users as IUser[];
        const userToLogin = users.find(user => user.email === data.email);

        if (userToLogin && userToLogin.password === data.password) {
          handleSignIn(userToLogin);
          history.push('/');
        }
        if (userToLogin && userToLogin.password !== data.password) {
          const error = new Yup.ValidationError(
            'Ccombinação de email e senha incorreto',
            data,
            'email',
          );
          throw error;
        }
      }
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <div>
        <h1>Sign in to task app</h1>
      </div>
      <Form>
        <Unform ref={formRef} onSubmit={handleSubmit}>
          <div>
            <p>Email</p>
            <Input name="email" />
          </div>

          <div>
            <p>Senha</p>
            <Input name="password" type="password" />
          </div>

          <div className="signin-button">
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </div>
        </Unform>
      </Form>

      <RedirectToSignUp>
        <span> Não possui conta ? </span>
        <Link className="link-to-signup" to="/signup">
          Crie uma conta
        </Link>
      </RedirectToSignUp>
    </Container>
  );
};

export default SignIn;
