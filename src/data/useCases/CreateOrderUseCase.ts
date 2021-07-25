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
    const newOrder = this.orderRepository.save(order);
    return newOrder;
  }
}
