import { Order } from '../../domain/entity/Order';
import { ICreateOrderDTO } from '../../domain/useCases/ICreateOrder';

export interface IOrderRepository {
  save(order: ICreateOrderDTO): Promise<Order>;
  findByOrderId(orderId: string): Promise<Order>;
}
