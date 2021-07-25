import { User } from '../entity/User';

export type createUserModel = {
  name: string;
  cpf: string;
};

export interface ICreateUser {
  createUser(user: createUserModel): Promise<User>;
}
