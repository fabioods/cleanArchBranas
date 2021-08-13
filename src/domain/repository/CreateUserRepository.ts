import { User } from '../entity/User';

export interface CreateUserRepository {
  save(user: User): Promise<User>;
}
