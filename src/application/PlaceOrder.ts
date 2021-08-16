import CouponRepository from '../domain/repository/CouponRepository';
import { FreightCalculator } from '../domain/service/FreightCalculator';
import ItemRepository from '../domain/repository/ItemRepository';
import { Order } from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';
import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import { ZipCodeCalculatorAPI } from '../domain/gateway/ZipCodeCalculatorAPI';

export class PlaceOrder {
  constructor(
    private itemRepository: ItemRepository,
    private couponRepository: CouponRepository,
    private orderRepository: OrderRepository,
    private zipcodeCalculator: ZipCodeCalculatorAPI
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf);
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      '99.999-99'
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const orderItem of input.items) {
      // eslint-disable-next-line no-await-in-loop
      const item = await this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orderRepository.save(order);
    return new PlaceOrderOutput({
      freight: order.freight,
      total,
    });
  }
}
