import { Coupon } from './Coupon';
import { OrderItem } from './OrderItem';
import { User } from './User';

export class Order {
  id: string;

  user: User;

  items: OrderItem[];

  coupon?: Coupon;

  constructor(user: User) {
    this.user = user;
    this.items = [];
  }

  getTotal(): number {
    let total = this.items.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) total -= (this.coupon.percentage * total) / 100;
    return total;
  }

  public addItem(
    description: string,
    quantity: number,
    price: number,
    order_id?: string,
    id?: string
  ): void {
    const item = new OrderItem(description, quantity, price, order_id, id);
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon): void {
    this.coupon = coupon;
  }
}
