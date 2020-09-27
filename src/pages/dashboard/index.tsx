import { Button, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import MaterialTable from 'material-table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import localStorage from 'redux-persist/lib/storage';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import { format } from 'date-fns';
import { uuid } from 'uuidv4';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import NavBar from '../../components/navBar';

import { Container, AddTask, Tasks } from './style';
import { IUser } from '../../redux/modules/users/types';
import Input from '../../components/input';
import {
  addTask,
  deleteTask,
  finishTask,
} from '../../redux/modules/tasks/actions';
import { ITask, IUserTasks } from '../../redux/modules/tasks/types';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const loadUser = useCallback(async () => {
    const dataFromLocalStorage = await localStorage.getItem('persist:root');
    if (dataFromLocalStorage) {
      const userFromlocalStorage = JSON.parse(
        JSON.parse(dataFromLocalStorage).auth,
      ).user as IUser;
      setUser(userFromlocalStorage);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    const dataFromLocalStorage = await localStorage.getItem('persist:root');
    if (dataFromLocalStorage) {
      const tasksFromLocalStorage = JSON.parse(
        JSON.parse(dataFromLocalStorage).tasks,
      ).allTasks as IUserTasks[];
      const tasksFromUser = tasksFromLocalStorage.find(
        task => task.userId === user.id,
      );
      if (tasksFromUser) {
        setTasks(tasksFromUser.tasks);
      }
    }
    console.log('veio');
  }, [user.id]);

  const handleDeleteTask = useCallback(
    async (task: ITask, userId: string) => {
      dispatch(deleteTask(task, userId));
      await loadTasks();
      history.go(0);
    },
    [dispatch, history, loadTasks],
  );

  const handleSubmitTask = useCallback(
    async (data: any) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da tarefa obrigatório'),
          deliveryDate: Yup.string().required(
            'Data de entrega da tarefa obrigatório',
          ),
          conclusionDate: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(addTask({ id: uuid(), ...data }, user.id));
        history.go(0);
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        console.log(errors);
      }
    },
    [dispatch, history, user.id],
  );

  useEffect(() => {
    loadUser();
    loadTasks();
  }, [loadTasks, loadUser]);

  return (
    <>
      <NavBar />

      <Container>
        <AddTask>
          <Unform ref={formRef} className="unform" onSubmit={handleSubmitTask}>
            <div className="task">
              <p>Tarefa</p>
              <Input name="name" placeholder="Digite a sua tarefa" />
            </div>
            <div>
              <p>Data de entrega</p>
              <Input name="deliveryDate" type="date" />
            </div>

            <div>
              <p>Data de conclusão</p>
              <Input name="conclusionDate" type="date" />
            </div>

            <Button variant="contained" type="submit">
              Cadastrar Tarefa
            </Button>
          </Unform>
        </AddTask>

        <Tasks>
          <MaterialTable
            title="Tarefas"
            columns={[
              { title: 'Tarefa', field: 'name' },
              { title: 'Data de entrega', field: 'deliveryDate', type: 'date' },
              {
                title: 'Data de de conclusão',
                field: 'conclusionDate',
                type: 'date',
              },
            ]}
            data={tasks.map(task => ({
              id: task.id,
              name: task.name,
              deliveryDate: task.deliveryDate,
              conclusionDate: task.conclusionDate,
            }))}
            actions={[
              () => ({
                icon: () => <DoneIcon style={{ color: '#7FFF00' }} />,
                tooltip: 'Finalizar tarefa',
                onClick: (event, rowData) => {
                  if (!Array.isArray(rowData)) {
                    dispatch(finishTask(rowData, user.id));
                  }
                },
              }),
              () => ({
                icon: () => <DeleteIcon style={{ color: '#c53126' }} />,
                tooltip: 'Deletar tarefa',
                onClick: (event, rowData) => {
                  if (!Array.isArray(rowData)) {
                    handleDeleteTask(rowData, user.id);
                  }
                },
              }),
            ]}
            detailPanel={[
              {
                icon: () => <VisibilityIcon style={{ color: '#05386b' }} />,
                tooltip: 'Visualizar tarefa',
                render: rowData => {
                  return <div>informações da tarefa</div>;
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Tasks>
      </Container>
    </>
  );
};

export default Dashboard;
