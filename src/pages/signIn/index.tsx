import React, { useRef, useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Container, Form, RedirectToSignUp } from './style';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string(),
      });
      const data = {
        email,
        password,
      };
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await signIn({
        email: data.email,
        password: data.password,
      });

      if (response === 'error') {
        throw Error;
      }

      history.push('/');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as cedenciais.',
      });
    }
  }, [addToast, email, history, password, signIn]);

  return (
    <Container>
      <div>
        <h1>Faça o login para entrar no Task App</h1>
      </div>
      <Form>
        <Unform className="unform" onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              type="email"
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
            />
          </div>

          <div>
            <TextField
              label="Senha"
              type="password"
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
            />
          </div>

          <div className="signin-button">
            <Button variant="contained" type="submit">
              Fazer Login
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
