import { Order } from '../entity/Order';

export type ICreateOrdemItemDTO = {
  description: string;
  quantity: number;
  price: number;
  height: number;
  width: number;
  thickness: number;
  weight: number;
};

export type ShippingDTO = {
  source: string;
  destination: string;
};

export type ICreateOrderDTO = {
  user_id: string;
  items: ICreateOrdemItemDTO[];
  coupon: string;
  shipping?: ShippingDTO;
};

export interface ICreateOrder {
  createOrder(order: ICreateOrderDTO): Promise<Order>;
}
