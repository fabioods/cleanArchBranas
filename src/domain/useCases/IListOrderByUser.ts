import { Order } from '../entity/Order';

export interface IListOrderByUser {
  findOrdersByUser(user_id: string): Promise<Order[] | null>;
}
