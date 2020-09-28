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
import { empty, uuid } from 'uuidv4';
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
import { useToast } from '../../hooks/ToastContext';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskToSubmit, setTaskToSubmit] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date>({} as Date);
  const [conclusionDate, setConclusionDate] = useState<Date>({} as Date);

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

  const handleSubmitTask = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da tarefa obrigatório'),
        deliveryDate: Yup.string().required(
          'Data de entrega da tarefa obrigatório',
        ),
        conclusionDate: Yup.string(),
      });

      const verifyConclusionDate =
        Object.keys(conclusionDate).length === 0 &&
        conclusionDate.constructor === Object;

      const verifyDeliveryDate =
        Object.keys(deliveryDate).length === 0 &&
        deliveryDate.constructor === Object;

      if (verifyDeliveryDate) {
        const error = new Yup.ValidationError(
          'Data de entrega obrigatória',
          deliveryDate,
          'Data de entrega',
          'Data de entrega',
        );
        throw error;
      }

      const data = {
        name: taskToSubmit,
        deliveryDate: `${deliveryDate.getFullYear()}-${
          deliveryDate.getMonth() + 1
        }-${deliveryDate.getDate() + 1}`,
        conclusionDate: !verifyConclusionDate
          ? `${conclusionDate.getFullYear()}-${conclusionDate.getMonth() + 1}-${
              conclusionDate.getDate() + 1
            }`
          : '',
      };
      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(
        addTask(
          { id: uuid(), ...data, isFinished: !verifyConclusionDate },
          user.id,
        ),
      );
      history.go(0);
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        err.errors.map(error =>
          addToast({
            type: 'error',
            title: 'Erro em cadastrar tarefa',
            description: error,
          }),
        );
      }
    }
  }, [
    addToast,
    conclusionDate,
    deliveryDate,
    dispatch,
    history,
    taskToSubmit,
    user.id,
  ]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <>
      <NavBar />

      <Container>
        <AddTask>
          <Unform ref={formRef} className="unform" onSubmit={handleSubmitTask}>
            <div>
              <TextField
                label="Tarefa"
                placeholder="Digite a descrição da sua tarefa"
                onChange={e => setTaskToSubmit(e.target.value)}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="date"
                label="Data de entrega"
                type="date"
                onChange={e => setDeliveryDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div>
              <TextField
                id="date"
                label="Data de conclusão"
                type="date"
                onChange={e => setConclusionDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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

              {!task.isFinished && (
                <Button
                  variant="contained"
                  type="button"
                  style={{ background: '#32CD32' }}
                  onClick={() => handleFinishTask(task, user.id)}
                >
                  Concluir
                </Button>
              )}

              <Button
                variant="contained"
                type="button"
                style={{ background: '#FF0000' }}
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
