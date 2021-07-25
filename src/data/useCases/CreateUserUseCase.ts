import { User } from '../../domain/entity/User';
import { createUserDTO, ICreateUser } from '../../domain/useCases/ICreateUser';
import { IUserRepository } from '../../infra/repositories/IUserRepository';

export class CreateUserUseCase implements ICreateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: createUserDTO): Promise<User> {
    const newUser = this.userRepository.save(user);
    return newUser;
  }
}
