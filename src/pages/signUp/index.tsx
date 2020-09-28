import React, { useCallback, useRef, useState } from 'react';
import { subYears } from 'date-fns';
import { Button, TextField } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';
import cep from 'cep-promise';
import { validate } from 'gerador-validador-cpf';

import { uuid } from 'uuidv4';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import NavBar from '../../components/navBar';

import { Content, Banner, Form } from './style';
import { addUser } from '../../redux/modules/users/actions';
import { IUser } from '../../redux/modules/users/types';
import { IState } from '../../redux/store';
import { useToast } from '../../hooks/ToastContext';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [CEP, setCEP] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [dateBirth, setDateBirth] = useState<Date>({} as Date);

  const handleDateChange = (date: Date) => {
    setDateBirth(date);
  };

  const handleCpfValidation = useCallback((cpfNumber: string) => {
    return validate(cpfNumber);
  }, []);

  const handleAddUser = useCallback(
    (user: IUser) => {
      dispatch(addUser(user));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        date: Yup.date()
          .max(
            subYears(new Date(), 12),
            'Você tem que ter mais de 12 anos para se cadastrar',
          )
          .required('Data de nascimento obrigatória'),
        cpf: Yup.string(),
        password: Yup.string().min(6, 'Senha tem que ter no mínimo 6 digitos'),
        cep: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        neighborhood: Yup.string(),
        street: Yup.string(),
        number: Yup.string(),
      });

      const data = {
        name,
        email,
        date: dateBirth,
        cpf,
        password,
        cep: CEP,
        state,
        city,
        neighborhood,
        street,
        number,
      };
      await schema.validate(data, {
        abortEarly: false,
      });

      const cpfValidation = handleCpfValidation(data.cpf);

      if (!cpfValidation) {
        const error = new Yup.ValidationError(
          'CPF invalido',
          data,
          'cpf',
          'cpf',
        );
        throw error;
      }

      handleAddUser({ id: uuid(), ...data });
      history.push('/signin');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        err.errors.map(error =>
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: error,
          }),
        );
      }
    }
  }, [
    CEP,
    city,
    cpf,
    dateBirth,
    email,
    handleAddUser,
    handleCpfValidation,
    history,
    name,
    neighborhood,
    number,
    password,
    state,
    street,
  ]);

  const handleCep = useCallback((cepData: string) => {
    setCEP(cepData);
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
          <Form>
            <Unform className="unform" ref={formRef} onSubmit={handleSubmit}>
              <div>
                <TextField
                  label="Nome"
                  onChange={e => setName(e.target.value)}
                  variant="outlined"
                />
              </div>

              <div>
                <TextField
                  label="Email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  variant="outlined"
                />
              </div>

              <div className="two-inputs">
                <TextField
                  id="date"
                  label="Data de nascimento"
                  type="date"
                  onChange={e => handleDateChange(new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="CPF"
                  onChange={e => setCpf(e.target.value)}
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

              <div className="two-inputs">
                <TextField
                  label="CEP"
                  onChange={e => handleCep(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Estado"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  variant="outlined"
                />
              </div>

              <div className="two-inputs">
                <TextField
                  label="Cidade"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Bairro"
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  variant="outlined"
                />
              </div>

              <div className="two-inputs">
                <TextField
                  label="Rua"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Número"
                  onChange={e => setNumber(e.target.value)}
                  variant="outlined"
                />
              </div>

              <Button variant="contained" type="submit">
                Cadastrar
              </Button>
            </Unform>
          </Form>

          <h3>
            Registre-se no task app para gerenciar as tarefas do seu dia a dia.
          </h3>
        </Banner>
      </Content>
    </>
  );
};

export default SignUp;
