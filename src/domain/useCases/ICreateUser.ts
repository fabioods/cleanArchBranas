import { User } from '../entity/User';

export type createUserDTO = {
  name: string;
  cpf: string;
};

export interface ICreateUser {
  createUser(user: createUserDTO): Promise<User>;
}
