import { Order } from '../entity/Order';

export default interface OrderRepository {
  save(order: Order): void;
  count(): number;
  getOrder(code: string): Promise<Order>;
}
