import { Order } from '../../../domain/entity/Order';
import { OrderRepository } from '../../../domain/repository/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<Order> {
    const order_id = `${new Date().getFullYear()}${String(
      this.orders.length + 1
    ).padStart(8, '0')}`;
    order.setId(order_id);
    this.orders.push(order);
    return order;
  }
}
