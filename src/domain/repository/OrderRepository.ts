import { Order } from '../entity/Order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  getOrder(code: string): Promise<Order>;
  clean(): Promise<void>;
}
