import { Order } from '../../domain/entity/Order';
import { IListOrderById } from '../../domain/useCases/IListOrderById';
import { IOrderRepository } from '../../infra/repositories/IOrderRepository';

export class ListOrderUseCase implements IListOrderById {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async listOrderById(orderId: string): Promise<Order | null> {
    return this.orderRepository.findByOrderId(orderId);
  }
}
