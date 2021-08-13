import { User } from '../entity/User';

export interface UserRepository {
  save(user: User): Promise<User>;
}
