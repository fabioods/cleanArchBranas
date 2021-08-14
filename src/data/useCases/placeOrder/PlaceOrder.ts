import { Order } from '../../../domain/entity/Order';
import { CouponRepository } from '../../../domain/repository/CouponRepository';
import { ItemRepository } from '../../../domain/repository/ItemRepository';
import { OrderRepository } from '../../../domain/repository/OrderRepository';
import { UserRepository } from '../../../domain/repository/UserRepository';
import { FreightCalculator } from '../../../providers/FreightCalculator';
import { PlaceOrderInput, PlaceOrderOutput } from './PlaceOrderDTO';

export class PlaceOrder {
  constructor(
    private itemRepository: ItemRepository,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private couponRepository: CouponRepository,
    private freightCalculator: FreightCalculator
  ) {}

  async execute(orderDTO: PlaceOrderInput): Promise<PlaceOrderOutput> {
    if (!orderDTO.user_id) throw new Error('User id is required');
    if (orderDTO.items.length === 0) throw new Error('items is required');

    const user = await this.userRepository.getById(orderDTO.user_id);
    if (!user) throw new Error(`User not found for id: ${orderDTO.user_id}`);

    const order = new Order(orderDTO.user_id);
    const distance = await this.freightCalculator.calculateDistance(
      orderDTO.freight.zipCodeOrigin,
      orderDTO.freight.zipCodeDestination
    );
    for (let index = 0; index < orderDTO.items.length; index++) {
      const itemDTO = orderDTO.items[index];
      // eslint-disable-next-line no-await-in-loop
      const item = await this.itemRepository.getById(itemDTO.id);
      if (!item) throw new Error(`Item with id ${itemDTO.id} not found`);
      order.addItem(item.id, itemDTO.quantity, item.price);
      // eslint-disable-next-line no-await-in-loop
      const price = await this.freightCalculator.calculatePrice(distance, item);
      order.incrementFreight(price * itemDTO.quantity);
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
