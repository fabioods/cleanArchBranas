import { Order } from '../../../domain/entity/Order';
import { ItemRepository } from '../../../domain/repository/ItemRepository';
import { OrderRepository } from '../../../domain/repository/OrderRepository';
import { UserRepository } from '../../../domain/repository/UserRepository';

type PlaceOrderItem = {
  id: string;
  quantity: number;
};

type PlaceOrderInput = {
  user_id: string | null;
  items: PlaceOrderItem[];
};

export class PlaceOrder {
  constructor(
    private itemRepository: ItemRepository,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository
  ) {}

  async execute(orderDTO: PlaceOrderInput): Promise<Order> {
    if (!orderDTO.user_id) throw new Error('User id is required');
    if (orderDTO.items.length === 0) throw new Error('items is required');

    const user = await this.userRepository.getById(orderDTO.user_id);
    if (!user) throw new Error(`User not found for id: ${orderDTO.user_id}`);

    const order = new Order(orderDTO.user_id);
    for (let index = 0; index < orderDTO.items.length; index++) {
      const itemDTO = orderDTO.items[index];
      // eslint-disable-next-line no-await-in-loop
      const item = await this.itemRepository.getById(itemDTO.id);
      if (!item) throw new Error(`Item with id ${itemDTO.id} not found`);
      order.addItem(item.id, itemDTO.quantity, item.price);
    }

    const newOrder = await this.orderRepository.save(order);

    return newOrder;
  }
}
