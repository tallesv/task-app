import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';
import cep from 'cep-promise';
import { validate } from 'gerador-validador-cpf';
import { subYears } from 'date-fns';
import { uuid } from 'uuidv4';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input';
import getValidationErrors from '../../utils/getValidationErrors';

import NavBar from '../../components/navBar';

import { Content, Banner, Form } from './style';
import { addUser } from '../../redux/modules/users/actions';
import { IUser } from '../../redux/modules/users/types';
import { IState } from '../../redux/store';

interface IAdress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [adressData, setAdressData] = useState<IAdress>({
    state: '',
    city: '',
    neighborhood: '',
    street: '',
  });

  const handleCpfValidation = useCallback((cpf: string) => {
    return validate(cpf);
  }, []);

  const handleAddUser = useCallback(
    (user: IUser) => {
      dispatch(addUser(user));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          date: Yup.date()
            .max(subYears(new Date(), 12))
            .required('Data de nascimento obrigatória'),
          cpf: Yup.string(),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
          cep: Yup.string(),
          state: Yup.string(),
          city: Yup.string(),
          neighborhood: Yup.string(),
          street: Yup.string(),
          number: Yup.string(),
        });

        const cpfValidation = handleCpfValidation(data.cpf);

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!cpfValidation) {
          const error = new Yup.ValidationError(
            'cpf invalido',
            data,
            'cpf',
            'cpf',
          );
          throw error;
        }

        handleAddUser({ id: uuid(), ...data });
        history.push('/signin');
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        console.log(errors);
      }
    },
    [handleAddUser, handleCpfValidation, history],
  );

  const handleAdress = useCallback(
    ({ state, city, neighborhood, street }: IAdress) => {
      setAdressData({
        state,
        city,
        neighborhood,
        street,
      });
    },
    [],
  );

  const handleCep = useCallback(
    (cepData: string) => {
      if (cepData.length === 8) {
        cep(cepData).then(response => {
          const { state } = response;
          const { city } = response;
          const { neighborhood } = response;
          const { street } = response;
          handleAdress({ state, city, neighborhood, street });
        });
      }
    },
    [handleAdress],
  );

  return (
    <>
      <NavBar />
      <Content>
        <Banner>
          <span>
            Registre-se no task app para gerenciar as tarefas do seu dia a dia.
          </span>

          <Form>
            <Unform
              className="unform"
              initialData={adressData}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div>
                <p>Nome</p>
                <Input name="name" />
              </div>

              <div>
                <p>Email</p>
                <Input name="email" />
              </div>

              <div>
                <p>Data de nascimento</p>
                <Input name="date" type="date" />
              </div>

              <div>
                <p>CPF</p>
                <Input name="cpf" />
              </div>

              <div>
                <p>Senha</p>
                <Input name="password" type="password" />
              </div>

              <div>
                <p>CEP</p>
                <Input name="cep" onChange={e => handleCep(e.target.value)} />
              </div>

              <div>
                <p>Estado</p>
                <Input name="state" />
              </div>

              <div>
                <p>Cidade</p>
                <Input name="city" />
              </div>

              <div>
                <p>Bairro</p>
                <Input name="neighborhood" />
              </div>

              <div className="endereço">
                <div>
                  <p>Rua</p>
                  <Input name="street" />
                </div>
                <div>
                  <p>Numero</p>
                  <Input name="number" />
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
