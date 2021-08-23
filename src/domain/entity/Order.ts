import { Coupon } from './Coupon';
import { CPF } from './CPF';
import { OrderItem } from './OrderItem';
import { OrderCode } from './OrderCode';

export class Order {
  cpf: CPF;

  items: OrderItem[];

  coupon: Coupon;

  freight: number;

  code: OrderCode;

  constructor(cpf: string, issueDate = new Date(), sequence = 1) {
    this.cpf = new CPF(cpf);
    this.items = [];
    this.freight = 0;
    this.code = new OrderCode(issueDate, sequence);
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
