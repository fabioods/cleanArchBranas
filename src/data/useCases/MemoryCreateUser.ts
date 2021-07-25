import { v4 as uuid } from 'uuid';
import { User } from '../../domain/entity/User';
import { createUserDTO, ICreateUser } from '../../domain/useCases/ICreateUser';

export class MemoryCreateUser implements ICreateUser {
  private users: User[];

  constructor() {
    this.users = [];
  }

  createUser(user: createUserDTO): Promise<User> {
    const newUser = { ...user, id: uuid() };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
}
