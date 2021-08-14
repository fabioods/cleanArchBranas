import { Order } from '../../../domain/entity/Order';
import { CouponRepository } from '../../../domain/repository/CouponRepository';
import { ItemRepository } from '../../../domain/repository/ItemRepository';
import { OrderRepository } from '../../../domain/repository/OrderRepository';
import { UserRepository } from '../../../domain/repository/UserRepository';
import { PlaceOrderInput, PlaceOrderOutput } from './PlaceOrderDTO';

export class PlaceOrder {
  constructor(
    private itemRepository: ItemRepository,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private couponRepository: CouponRepository
  ) {}

  async execute(orderDTO: PlaceOrderInput): Promise<PlaceOrderOutput> {
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
    if (orderDTO.coupon_code) {
      const coupon = await this.couponRepository.getByCode(
        orderDTO.coupon_code
      );
      if (!coupon)
        throw new Error(`Coupon with code ${orderDTO.coupon_code} not found`);
      order.addCoupon(coupon);
    }

    const newOrder = await this.orderRepository.save(order);

    return { order: newOrder };
  }
}
