import { Coupon } from './Coupon';
import { OrderItem } from './OrderItem';

export class Order {
  id: string;

  user_id: string;

  items: OrderItem[];

  coupon?: Coupon;

  freight: number;

  constructor(user_id: string) {
    this.user_id = user_id;
    this.items = [];
    this.freight = 0;
  }

  public getTotal(): number {
    let total =
      this.items.reduce((acc, item) => acc + item.getTotal(), 0) -
      this.getDiscount();
    if (this.freight) total += this.freight;
    return total;
  }

  public getDiscount(): number {
    const total = this.items.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) return (this.coupon.percentage * total) / 100;
    return 0;
  }

  public addItem(item_id: string, quantity: number, price: number): void {
    const item = new OrderItem(item_id, quantity, price);
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon): void {
    if (coupon.isValid()) this.coupon = coupon;
  }

  public incrementFreight(value: number): void {
    this.freight += value;
  }

  public setId(id: string): void {
    this.id = id;
    this.items.forEach(item => item.setOrderId(id));
  }
}
