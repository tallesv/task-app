export interface ITask {
  id: string;
  name: string;
  deliveryDate: string;
  conclusionDate?: string;
  isFinished: boolean;
}

export interface IUserTasks {
  userId: string;
  tasks: ITask[];
}

export interface ITaskState {
  allTasks: IUserTasks[];
}
