import { CreateUserRepository } from '../../domain/repository/CreateUserRepository';
import { CreateUserRepositoryMemory } from '../../infra/repository/memory/CreateUserRepositoryMemory';
import { CPFValidator } from '../../utils/cpfValidator/cpfValidator';
import { CreateUser } from './CreateUser';

const makeCPFValidator = (): CPFValidator => {
  class CPFValidatorAdapter implements CPFValidator {
    validate(cpf: string): boolean {
      return true;
    }
  }
  return new CPFValidatorAdapter();
};

interface MakeSUT {
  createUser: CreateUser;
  cpfValidator: CPFValidator;
  createUserRepository: CreateUserRepository;
}

const makeSUT = (): MakeSUT => {
  const cpfValidator = makeCPFValidator();
  const createUserRepository = new CreateUserRepositoryMemory();
  const createUser = new CreateUser(cpfValidator, createUserRepository);
  return { cpfValidator, createUser, createUserRepository };
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
