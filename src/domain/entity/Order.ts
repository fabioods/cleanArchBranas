import { Coupon } from './Coupon';
import { CPF } from './CPF';
import { OrderCode } from './OrderCode';
import { OrderItem } from './OrderItem';

export class Order {
  cpf: CPF;

  items: OrderItem[];

  coupon: Coupon;

  freight: number;

  code: OrderCode;

  issueDate: Date;

  sequence: number;

  constructor(cpf: string, issueDate = new Date(), sequence = 1) {
    this.cpf = new CPF(cpf);
    this.items = [];
    this.freight = 0;
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.code = new OrderCode(issueDate, sequence);
  }

  addItem(id: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(id, quantity, price));
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
