export interface ITask {
  id: string;
  name: string;
  deliveryDate: Date;
  conclusionDate?: Date;
}

export interface IUserTasks {
  userId: string;
  tasks: ITask[];
}

export interface ITaskState {
  allTasks: IUserTasks[];
}
