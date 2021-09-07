import { FreightCalculator } from '../../domain/service/FreightCalculator';
import { Order } from '../../domain/entity/Order';
import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import { ZipCodeCalculatorAPI } from '../../domain/gateway/ZipCodeCalculatorAPI';
import { RepositoryFactory } from '../../domain/factory/RepositoryFactory';

export class PlaceOrder {
  constructor(
    private repositoryFactory: RepositoryFactory,
    private zipcodeCalculator: ZipCodeCalculatorAPI
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence =
      (await this.repositoryFactory.createOrderRepository().count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      '99.999-99'
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const orderItem of input.items) {
      // eslint-disable-next-line no-await-in-loop
      const item = await this.repositoryFactory
        .createItemRepository()
        .getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, Number(item.price), orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = await this.repositoryFactory
        .createCouponRepository()
        .getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    await this.repositoryFactory.createOrderRepository().save(order);
    return new PlaceOrderOutput({
      code: order.code.value,
      freight: order.freight,
      total,
    });
  }
}
