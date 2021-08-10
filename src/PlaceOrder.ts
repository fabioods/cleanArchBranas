import { Coupon } from './Coupon';
import { FreightCalculator } from './FreightCalculator';
import { Item } from './Item';
import { Order } from './Order';
import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import { ZipCodeCalculatorAPI } from './ZipCodeCalculatorAPI';
import { ZipCodeCalculatorMemory } from './ZipCodeCalculatorMemory';

export class PlaceOrder {
  coupons: Coupon[];

  orders: Order[];

  items: Item[];

  zipCodeCalculator: ZipCodeCalculatorAPI;

  constructor() {
    this.coupons = [
      new Coupon('VALE20', 20, new Date('2021-10-10')),
      new Coupon('VALE20_EXPIRED', 20, new Date('2020-10-10')),
    ];
    this.orders = [];
    this.items = [
      new Item('1', 'Guitarra', 1000, 100, 50, 15, 3),
      new Item('2', 'Amplificador', 5000, 50, 50, 50, 22),
      new Item('3', 'Cabo', 30, 10, 10, 10, 1),
    ];
    this.zipCodeCalculator = new ZipCodeCalculatorMemory();
  }

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf);
    const distance = this.zipCodeCalculator.calculate(
      input.zipcode,
      '11-111-00'
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const orderItem of input.items) {
      const item = this.items.find(i => i.id === orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity;
    }

    if (input.coupon) {
      const couponFound = this.coupons.find(c => c.code === input.coupon);
      if (couponFound) order.addCoupon(couponFound);
    }
    const total = order.getTotal();
    this.orders.push(order);
    return new PlaceOrderOutput({ total, freight: order.freight });
  }
}
