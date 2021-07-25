import { Order } from '../../domain/entity/Order';
import {
  ICreateOrder,
  ICreateOrderDTO,
} from '../../domain/useCases/ICreateOrder';
import { IOrderRepository } from '../../infra/repositories/IOrderRepository';

export class CreateOrderUseCase implements ICreateOrder {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(order: ICreateOrderDTO): Promise<Order> {
    if (!order.user_id) throw new Error('Missing user_id');
    if (order.items.length === 0)
      throw new Error('Order must have at least one item');
    const newOrder = this.orderRepository.save(order);
    return newOrder;
  }
}
