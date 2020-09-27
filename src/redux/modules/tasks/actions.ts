import { ITask } from './types';

export function addTask(task: ITask, userId: string) {
  return {
    type: 'ADD_TASK',
    payload: {
      task,
      userId,
    },
  };
}

export function editTask(task: ITask, userId: string) {
  return {
    type: 'EDIT_TASK',
    payload: {
      task,
      userId,
    },
  };
}

export function deleteTask(task: ITask, userId: string) {
  return {
    type: 'DELETE_TASK',
    payload: {
      task,
      userId,
    },
  };
}

export function finishTask(task: ITask, userId: string) {
  return {
    type: 'FINISH_TASK',
    payload: {
      task,
      userId,
    },
  };
}
