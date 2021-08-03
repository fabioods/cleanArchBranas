import { v4 as uuid } from 'uuid';
import { Order } from '../../../domain/entity/Order';
import { OrderItem } from '../../../domain/entity/OrderItem';
import { IOrderRepository } from '../IOrderRepository';

export class MemoryOrderRepository implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async findOrdersByUser(user_id: string): Promise<Order[] | null> {
    const orders = this.orders.filter(order => order.user.id === user_id);
    return orders;
  }

  async save(order: Order): Promise<Order> {
    Object.assign(order, { id: uuid() });

    // eslint-disable-next-line no-param-reassign
    order.items = order.items.map(item => {
      const newItem = Object.assign(item, { id: uuid(), order_id: order.id });
      return newItem;
    });

    this.orders.push(order);
    return order;
  }
}
