export interface IUser {
  id: string;
  name: string;
  email: string;
  date: Date;
  cpf: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

export interface IUsersSate {
  users: IUser[];
}
