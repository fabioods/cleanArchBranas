import { UserRepository } from '../../../domain/repository/UserRepository';
import { UserRepositoryMemory } from '../../../infra/repository/memory/UserRepositoryMemory';
import { CPFValidator } from '../../../utils/cpfValidator/cpfValidator';
import { CreateUser } from './CreateUser';

const makeCPFValidator = (): CPFValidator => {
  class CPFValidatorAdapter implements CPFValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(cpf: string): boolean {
      return true;
    }
  }
  return new CPFValidatorAdapter();
};

interface MakeSUT {
  createUser: CreateUser;
  cpfValidator: CPFValidator;
  userRepository: UserRepository;
}

const makeSUT = (): MakeSUT => {
  const cpfValidator = makeCPFValidator();
  const userRepository = new UserRepositoryMemory();
  const createUser = new CreateUser(cpfValidator, userRepository);
  return { cpfValidator, createUser, userRepository };
};

describe('Create a new User', () => {
  it('should create a new user with a valid CPF', async () => {
    const user = {
      name: 'any_name',
      cpf: 'valid_cpf',
    };
    const { createUser } = makeSUT();
    const newUser = await createUser.execute(user);
    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.name).toBe(user.name);
  });

  it('should not create a new user with an invalid CPF', async () => {
    const user = {
      name: 'any_name',
      cpf: 'invalid_cpf',
    };
    const { createUser, cpfValidator } = makeSUT();
    jest.spyOn(cpfValidator, 'validate').mockImplementationOnce(() => {
      return false;
    });
    const newUser = createUser.execute(user);
    await expect(newUser).rejects.toThrow();
  });
});
