import { User } from '../../../domain/entity/User';
import { UserRepository } from '../../../domain/repository/UserRepository';
import { CPFValidator } from '../../../utils/cpfValidator/cpfValidator';

type CreateUserDTO = {
  name: string;
  cpf: string;
};

export class CreateUser {
  constructor(
    private cpfValidator: CPFValidator,
    private createUserRepository: UserRepository
  ) {}

  async execute(userDTO: CreateUserDTO): Promise<User> {
    if (!this.cpfValidator.validate(userDTO.cpf))
      throw new Error('CPF inválido');

    const user = new User(userDTO.name, userDTO.cpf);
    const newUser = await this.createUserRepository.save(user);
    return newUser;
  }
}
