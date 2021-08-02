import { Coupon } from './Coupon';
import { CPF } from './CPF';
import { OrderItem } from './OrderItem';

export class Order {
  cpf: CPF;

  items: OrderItem[];

  coupon: Coupon;

  constructor(cpf: string) {
    this.cpf = new CPF(cpf);
    this.items = [];
  }

  addItem(description: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(description, price, quantity));
  }

  getTotal(): number {
    let total = this.items.reduce((cur, next) => {
      return cur + next.getTotal();
    }, 0);

    if (this.coupon) total -= (this.coupon.percentage / 100) * total;

    return total;
  }

  addCoupon(coupon: Coupon): void {
    this.coupon = coupon;
  }
}
