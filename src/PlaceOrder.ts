import { Coupon } from './Coupon';
import { Order } from './Order';

export class PlaceOrder {
  coupons: Coupon[];

  orders: Order[];

  constructor() {
    this.coupons = [new Coupon('VALE20', 20)];
    this.orders = [];
  }

  execute(input: any) {
    const order = new Order(input.cpf);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of input.items) {
      order.addItem(item.description, item.price, item.quantity);
    }

    if (input.coupon) {
      const couponFound = this.coupons.find(c => c.code === input.coupon);
      if (couponFound) order.addCoupon(couponFound);
    }
    const total = order.getTotal();
    this.orders.push(order);
    return { total };
  }
}
