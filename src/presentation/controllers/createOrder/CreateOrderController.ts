import { ICreateOrder } from '../../../domain/useCases/ICreateOrder';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class CreateOrderController implements IController {
  private createOrderUseCase: ICreateOrder;

  constructor(createOrderUseCase: ICreateOrder) {
    this.createOrderUseCase = createOrderUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;
    const { order } = body;
    try {
      const newOrder = await this.createOrderUseCase.createOrder(order);
      return {
        status: 200,
        body: newOrder,
      };
    } catch (error) {
      return {
        status: 400,
        body: error.message,
      };
    }
  }
}
