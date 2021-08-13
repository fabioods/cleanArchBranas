import { User } from '../../../domain/entity/User';
import { UserRepository } from '../../../domain/repository/UserRepository';

export class UserRepositoryMemory implements UserRepository {
  private user: User[];

  constructor() {
    this.user = [];
  }

  async getById(id: string): Promise<User | undefined> {
    return this.user.find(u => u.id === id);
  }

  async save(user: User): Promise<User> {
    Object.assign(user, { id: this.user.length + 1 });
    this.user.push(user);
    return user;
  }
}
