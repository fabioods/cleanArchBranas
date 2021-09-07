/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { RepositoryFactory } from '../../domain/factory/RepositoryFactory';
import { GetOrderItemsOutput, GetOrderOutput } from './GetOrderOutput';

export class GetOrder {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.repositoryFactory
      .createOrderRepository()
      .getOrder(code);
    const orderItems: GetOrderItemsOutput[] = [];
    for (const orderItem of order.items) {
      const item = await this.repositoryFactory
        .createItemRepository()
        .getById(orderItem.id);
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
