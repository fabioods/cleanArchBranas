import { User } from '../../domain/entity/User';
import { createUserDTO } from '../../domain/useCases/ICreateUser';

export interface IUserRepository {
  save(user: createUserDTO): Promise<User>;
  getAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
}
