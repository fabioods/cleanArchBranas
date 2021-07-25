import { v4 as uuid } from 'uuid';
import { User } from '../../../domain/entity/User';
import { createUserDTO } from '../../../domain/useCases/ICreateUser';
import { IUserRepository } from '../IUserRepository';

export class MemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async save(user: createUserDTO): Promise<User> {
    const newUser = { ...user, id: uuid() };
    this.users.push(newUser);
    return newUser;
  }
}
