import { User } from '../entity/User';

export interface IListAllUsers {
  listAllUsers(): Promise<User[]>;
}
