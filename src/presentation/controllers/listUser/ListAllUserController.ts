import { IListAllUsers } from '../../../domain/useCases/IListAllUsers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class ListAllUserController implements IController {
  private listAllUserUseCase: IListAllUsers;

  constructor(listAllUserUseCase: IListAllUsers) {
    this.listAllUserUseCase = listAllUserUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      status: 200,
      body: await this.listAllUserUseCase.listAllUsers(),
    };
  }
}
