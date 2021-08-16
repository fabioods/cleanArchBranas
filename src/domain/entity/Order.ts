import { Coupon } from './Coupon';
import { CPF } from './CPF';
import { OrderItem } from './OrderItem';

export class Order {
  cpf: CPF;

  items: OrderItem[];

  coupon: Coupon;

  freight: number;

  constructor(cpf: string) {
    this.cpf = new CPF(cpf);
    this.items = [];
    this.freight = 0;
  }

  addItem(id: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(id, price, quantity));
  }

  getTotal(): number {
    let total = this.items.reduce((cur, next) => {
      return cur + next.getTotal();
    }, 0);

    if (this.coupon) total -= (this.coupon.percentage / 100) * total;
    total += this.freight;
    return total;
  }

  addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) this.coupon = coupon;
  }
}
