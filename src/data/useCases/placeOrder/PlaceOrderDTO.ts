import { Order } from '../../../domain/entity/Order';

export type PlaceOrderItem = {
  id: string;
  quantity: number;
};

export type PlaceOrderFreight = {
  zipCodeOrigin: string;
  zipCodeDestination: string;
};

export type PlaceOrderInput = {
  user_id: string | null;
  items: PlaceOrderItem[];
  coupon_code?: string;
  freight: PlaceOrderFreight;
};

export type PlaceOrderOutput = {
  order: Order;
};
