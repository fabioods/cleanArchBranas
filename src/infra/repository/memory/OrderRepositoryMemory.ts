import { Order } from '../../../domain/entity/Order';
import { OrderRepository } from '../../../domain/repository/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<Order> {
    this.orders.push(Object.assign(order, { id: `${this.orders.length + 1}` }));
    return order;
  }
}
