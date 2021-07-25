import { CreateUserUseCase } from '../../../data/useCases/CreateUserUseCase';
import { MemoryUserRepository } from '../../../infra/repositories/implementation/MemoryUserRepository';
import { CPFValidatorAdapter } from '../../../utils/cpfValidatorAdapter';
import { IController } from '../../protocols';
import { CreateUserController } from './CreateUserController';

describe('CreateUserController', () => {
  const makeCreateUserController = (): IController => {
    const cpfValidatorAdapter = new CPFValidatorAdapter();
    const userRepository = new MemoryUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(
      cpfValidatorAdapter,
      createUserUseCase
    );
    return createUserController;
  };

  it('should be able to return status 400 if cpf provided is invalid', async () => {
    const createUserController = makeCreateUserController();
    const httpResponse = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-20' },
    });
    expect(httpResponse.status).toEqual(400);
  });

  it('should be able to return status 200 if user was created successfully', async () => {
    const createUserController = makeCreateUserController();
    const httpResponse = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    expect(httpResponse.status).toEqual(200);
  });

  it('should be able to return status 400 if name of user was not provided', async () => {
    const createUserController = makeCreateUserController();
    const httpResponse = await createUserController.handle({
      body: { name: null, cpf: '529.982.247-25' },
    });
    expect(httpResponse.status).toEqual(400);
  });

  it('should be able to return status 400 if cpf of user was not provided', async () => {
    const createUserController = makeCreateUserController();
    const httpResponse = await createUserController.handle({
      body: { name: 'Fábio', cpf: null },
    });
    expect(httpResponse.status).toEqual(400);
  });

  it('should be able to return an uuid when create a new user', async () => {
    const createUserController = makeCreateUserController();
    const newUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    expect(newUser.body.user.id).toBeDefined();
  });
});
