import { Coupon } from './Coupon';
import { OrderItem } from './OrderItem';

export class Order {
  id: string;

  user_id: string;

  items: OrderItem[];

  coupon?: Coupon;

  constructor(user_id: string) {
    this.user_id = user_id;
    this.items = [];
  }

  getTotal(): number {
    let total = this.items.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) total -= (this.coupon.percentage * total) / 100;
    return total;
  }

  public addItem(item_id: string, quantity: number, price: number): void {
    const item = new OrderItem(item_id, quantity, price);
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon): void {
    this.coupon = coupon;
  }

  public setId(id: string): void {
    this.id = id;
    this.items.forEach(item => item.setOrderId(id));
  }
}
