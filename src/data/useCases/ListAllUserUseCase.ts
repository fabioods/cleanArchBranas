import { User } from '../../domain/entity/User';
import { IListAllUsers } from '../../domain/useCases/IListAllUsers';
import { IUserRepository } from '../../infra/repositories/IUserRepository';

export class ListAllUsersUseCase implements IListAllUsers {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async listAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
