import { Order } from '../entity/Order';

export interface IListOrderById {
  listOrderById(orderId: string): Promise<Order | null>;
}
