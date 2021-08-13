import { Order } from '../entity/Order';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
}
