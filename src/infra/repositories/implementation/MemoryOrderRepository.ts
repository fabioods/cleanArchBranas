import { v4 as uuid } from 'uuid';
import { Order } from '../../../domain/entity/Order';
import { ICreateOrderDTO } from '../../../domain/useCases/ICreateOrder';
import { IOrderRepository } from '../IOrderRepository';

export class MemoryOrderRepository implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async findOrdersByUser(user_id: string): Promise<Order[] | null> {
    const orders = this.orders.filter(order => order.user_id === user_id);
    return orders;
  }

  async save(order: ICreateOrderDTO): Promise<Order> {
    const { user_id, discount, items, total } = order;
    const total_with_discount = discount
      ? total - (discount / 100) * total
      : total;
    const newOrder = {
      id: uuid(),
      discount,
      total,
      user_id,
      total_with_discount,
    } as Order;
    const itemsFormatted = items.map(item => {
      return {
        ...item,
        id: uuid(),
        order_id: newOrder.id,
      };
    });
    this.orders.push(newOrder);

    return { ...newOrder, items: itemsFormatted };
  }
}
