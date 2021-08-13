import { User } from '../../../domain/entity/User';
import { CreateUserRepository } from '../../../domain/repository/CreateUserRepository';

export class CreateUserRepositoryMemory implements CreateUserRepository {
  private user: User[];

  constructor() {
    this.user = [];
  }

  async save(user: User): Promise<User> {
    Object.assign(user, { id: this.user.length + 1 });
    this.user.push(user);
    return user;
  }
}
