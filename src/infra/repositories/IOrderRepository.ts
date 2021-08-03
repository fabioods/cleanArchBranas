import { Order } from '../../domain/entity/Order';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findOrdersByUser(user_id: string): Promise<Order[] | null>;
}
