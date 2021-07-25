import { CreateUserUseCase } from '../../../data/useCases/CreateUserUseCase';
import { ListAllUsersUseCase } from '../../../data/useCases/ListAllUserUseCase';
import { MemoryUserRepository } from '../../../infra/repositories/implementation/MemoryUserRepository';
import { CPFValidatorAdapter } from '../../../utils/cpfValidatorAdapter';
import { CreateUserController } from '../createUser/CreateUserController';
import { ListAllUserController } from './ListAllUserController';

describe('Listar todos os usuários', () => {
  const makeSUT = () => {
    const userRepository = new MemoryUserRepository();
    const listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
    const cpfValidatorAdapter = new CPFValidatorAdapter();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const listAllUsersController = new ListAllUserController(
      listAllUsersUseCase
    );

    const createUserController = new CreateUserController(
      cpfValidatorAdapter,
      createUserUseCase
    );
    return { listAllUsersController, createUserController };
  };

  it('should be able to return the number correct of users created', async () => {
    const { listAllUsersController, createUserController } = makeSUT();
    await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    await createUserController.handle({
      body: { name: 'João', cpf: '529.982.247-25' },
    });
    const response = await listAllUsersController.handle({});
    expect(response.body.length).toEqual(2);
  });

  it('should be able to return the wrong number correct of users created', async () => {
    const { listAllUsersController, createUserController } = makeSUT();
    await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    await createUserController.handle({
      body: { name: 'João', cpf: '529.982.247-25' },
    });
    const response = await listAllUsersController.handle({});
    expect(response.body.length).not.toEqual(1);
  });
});
