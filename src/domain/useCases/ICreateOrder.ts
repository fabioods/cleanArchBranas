import { Order } from '../entity/Order';

export type ICreateOrdemItemDTO = {
  description: string;
  quantity: number;
  price: number;
};

export type ICreateOrderDTO = {
  user_id: string;
  items: ICreateOrdemItemDTO[];
  coupon: string;
};

export interface ICreateOrder {
  createOrder(order: ICreateOrderDTO): Promise<Order>;
}
