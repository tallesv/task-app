import React, { useCallback, useRef, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';
import cep from 'cep-promise';
import getValidationErrors from '../../utils/getValidationErrors';

import NavBar from '../../components/navBar';

import { Content, Banner, Form } from './style';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        date: Yup.date().required('Data de nascimento obrigatória'),
        cpf: Yup.string(),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
        cep: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        neighborhood: Yup.string(),
        street: Yup.string(),
        number: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
      console.log(err);
    }
  }, []);

  const handleCep = useCallback((cepData: string) => {
    if (cepData.length === 8) {
      cep(cepData).then(response => {
        setState(response.state);
        setCity(response.city);
        setNeighborhood(response.neighborhood);
        setStreet(response.street);
      });
    }
  }, []);
  return (
    <>
      <NavBar />
      <Content>
        <Banner>
          <span>
            Registre-se no task app para gerenciar as tarefas do seu dia a dia.
          </span>

          <Form>
            <Unform className="unform" ref={formRef} onSubmit={handleSubmit}>
              <div>
                <p>Nome</p>
                <TextField name="name" variant="outlined" />
              </div>

              <div>
                <p>Email</p>
                <TextField variant="outlined" type="email" />
              </div>

              <div>
                <p>Data de nascimento</p>
                <TextField variant="outlined" />
              </div>

              <div>
                <p>CPF</p>
                <TextField variant="outlined" />
              </div>

              <div>
                <p>Senha</p>
                <TextField variant="outlined" type="password" />
              </div>

              <div>
                <p>CEP</p>
                <TextField
                  variant="outlined"
                  onChange={e => handleCep(e.target.value)}
                />
              </div>

              <div>
                <p>Estado</p>
                <TextField value={state} variant="outlined" />
              </div>

              <div>
                <p>Cidade</p>
                <TextField value={city} variant="outlined" />
              </div>

              <div>
                <p>Bairro</p>
                <TextField value={neighborhood} variant="outlined" />
              </div>

              <div className="endereço">
                <div>
                  <p>Rua</p>
                  <TextField value={street} variant="outlined" />
                </div>
                <div>
                  <p>Numero</p>
                  <TextField id="numero" variant="outlined" />
                </div>
              </div>
              <Button variant="contained" type="submit">
                Cadastrar
              </Button>
            </Unform>
          </Form>
        </Banner>
      </Content>
    </>
  );
};

export default SignUp;
