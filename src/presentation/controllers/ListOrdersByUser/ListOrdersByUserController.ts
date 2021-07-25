import { IListOrderByUser } from '../../../domain/useCases/IListOrderByUser';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class ListOrderByUserController implements IController {
  private listOrderByUserUseCase: IListOrderByUser;

  constructor(listOrderByUserUseCase: IListOrderByUser) {
    this.listOrderByUserUseCase = listOrderByUserUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;
    const { user_id } = body;

    const orders = await this.listOrderByUserUseCase.findOrdersByUser(user_id);
    return {
      status: 200,
      body: orders,
    };
  }
}
