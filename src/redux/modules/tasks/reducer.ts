import { Reducer } from 'redux';
import produce from 'immer';
import { ITask, ITaskState } from './types';

const INITIAL_STATE: ITaskState = {
  allTasks: [],
};

const tasks: Reducer<ITaskState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TASK': {
        const { userId } = action.payload;
        const { task } = action.payload;
        const findUser = state.allTasks.find(user => user.userId === userId);

        if (findUser) {
          draft.allTasks.map(userTask =>
            userTask.userId === userId ? userTask.tasks.push(task) : userTask,
          );
        }

        if (!findUser) {
          draft.allTasks.push({ userId, tasks: [task] });
        }
        break;
      }
      case 'EDIT_TASK': {
        const { userId } = action.payload;
        const taskToUpdate = action.payload.task;

        draft.allTasks.map(userTask =>
          userTask.userId === userId
            ? userTask.tasks.map(task =>
                task.id === taskToUpdate.id ? taskToUpdate : task,
              )
            : userTask,
        );

        break;
      }
      case 'DELETE_TASK': {
        const { userId } = action.payload;
        const taskToDelete = action.payload.task;

        const user = state.allTasks.find(
          userTask => userTask.userId === userId,
        );

        const taskIndex = user?.tasks.findIndex(
          task => task.id === taskToDelete.id,
        );
        if (taskIndex || taskIndex === 0) {
          draft.allTasks.map(userTask =>
            userTask.userId === userId
              ? userTask.tasks.splice(taskIndex, 1)
              : userTask,
          );
        }

        break;
      }
      case 'FINISH_TASK': {
        const { userId } = action.payload;
        const taskToFinish = action.payload.task as ITask;
        const today = new Date();
        const todayDate = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;

        const user = state.allTasks.find(
          userTask => userTask.userId === userId,
        );

        const userIndex = state.allTasks.findIndex(
          userTask => userTask.userId === userId,
        );

        const taskIndex = user?.tasks.findIndex(
          task => task.id === taskToFinish.id,
        );
        if (taskIndex || taskIndex === 0) {
          taskToFinish.conclusionDate = todayDate;
          taskToFinish.isFinished = true;
          const newTask = taskToFinish;
          draft.allTasks[userIndex].tasks[taskIndex] = newTask;
        }

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default tasks;
