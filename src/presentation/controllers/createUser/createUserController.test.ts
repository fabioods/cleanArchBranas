import { MemoryCreateUser } from '../../../data/useCases/MemoryCreateUser';
import { CPFValidatorAdapter } from '../../../utils/cpfValidatorAdapter';
import { IController } from '../../protocols';
import { CreateUserController } from './createUserController';

describe('CreateUserController', () => {
  const makeCreateUserController = (): IController => {
    const cpfValidatorAdapter = new CPFValidatorAdapter();
    const createUserMemory = new MemoryCreateUser();
    const createUserController = new CreateUserController(
      cpfValidatorAdapter,
      createUserMemory
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
});
