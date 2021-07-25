import { ICreateUser } from '../../../domain/useCases/ICreateUser';
import {
  IController,
  HttpRequest,
  HttpResponse,
  ICPFValidator,
} from '../../protocols';

export class CreateUserController implements IController {
  private cpfValidator: ICPFValidator;

  private createUserUseCase: ICreateUser;

  constructor(cpfValidator: ICPFValidator, createUserUseCase: ICreateUser) {
    this.cpfValidator = cpfValidator;
    this.createUserUseCase = createUserUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;
    const { name, cpf } = body;

    if (!name || !cpf) {
      return {
        status: 400,
        body: {
          message: 'Nome e CPF são obrigatórios',
        },
      };
    }

    if (!this.cpfValidator.validate(cpf)) {
      return {
        status: 400,
        body: {
          message: 'CPF inválido',
        },
      };
    }

    const user = await this.createUserUseCase.createUser({ cpf, name });

    return {
      status: 200,
      body: {
        message: 'User created',
        user,
      },
    };
  }
}
