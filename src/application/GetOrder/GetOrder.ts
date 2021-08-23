/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import { GetOrderItemsOutput, GetOrderOutput } from './GetOrderOutput';

export class GetOrder {
  constructor(
    private itemRepository: ItemRepository,
    private couponRepository: CouponRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.getOrder(code);
    const orderItems: GetOrderItemsOutput[] = [];
    for (const orderItem of order.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      const orderItemOut = {
        itemDescription: item?.description,
        price: orderItem.price,
        quantity: orderItem.quantity,
      };
      orderItems.push(orderItemOut);
    }
    return new GetOrderOutput({
      code: order.code.value,
      freight: order.freight,
      orderItems,
      total: order.getTotal(),
    });
  }
}
