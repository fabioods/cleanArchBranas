import { Order } from '../../domain/entity/Order';
import { IListOrderByUser } from '../../domain/useCases/IListOrderByUser';
import { IOrderRepository } from '../../infra/repositories/IOrderRepository';

export class ListOrderByUserUseCase implements IListOrderByUser {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async findOrdersByUser(user_id: string): Promise<Order[] | null> {
    const orders = await this.orderRepository.findOrdersByUser(user_id);
    return orders;
  }
}
