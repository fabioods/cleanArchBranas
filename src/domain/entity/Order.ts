import { OrderItem } from './OrderItem';
import { User } from './User';

export type Order = {
  id: string;
  user?: User;
  user_id: string;
  items: OrderItem[];
  discount: number;
  total: number;
  total_with_discount: number;
};
