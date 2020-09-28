import { Button, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import MaterialTable from 'material-table';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);

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

  const handleFinishTask = useCallback(
    async (task: ITask, userId: string) => {
      dispatch(finishTask(task, userId));
      await loadTasks();
      history.go(0);
    },
    [dispatch, history, loadTasks],
  );

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

        dispatch(
          addTask(
            { id: uuid(), ...data, isFinished: !(data.conclusionDate === '') },
            user.id,
          ),
        );
        history.go(0);
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [dispatch, history, user.id],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <>
      <NavBar />

      <Container>
        <AddTask>
          <Unform ref={formRef} className="unform" onSubmit={handleSubmitTask}>
            <div className="task-input">
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
          {tasks.map(task => (
            <div className="tasks">
              <div>
                <h3>Tarefa:</h3>
                <span>{task.name}</span>
              </div>
              <div>
                <h3>Data de entrega:</h3>
                <span>{task.deliveryDate}</span>
              </div>
              {task.conclusionDate && (
                <div>
                  <h3>Data de conclusão:</h3>
                  <span>{task.conclusionDate}</span>
                </div>
              )}
              <Button
                variant="contained"
                type="button"
                style={{ background: 'blue' }}
              >
                Visualizar
              </Button>

              {!task.isFinished && (
                <Button
                  variant="contained"
                  type="button"
                  style={{ background: 'green' }}
                  onClick={() => handleFinishTask(task, user.id)}
                >
                  Finalizar
                </Button>
              )}

              <Button
                variant="contained"
                type="button"
                style={{ background: 'red' }}
                onClick={() => handleDeleteTask(task, user.id)}
              >
                Deletar
              </Button>
            </div>
          ))}
        </Tasks>
      </Container>
    </>
  );
};

export default Dashboard;
