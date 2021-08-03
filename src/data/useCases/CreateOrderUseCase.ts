import { Order } from '../../domain/entity/Order';
import {
  ICreateOrder,
  ICreateOrderDTO,
} from '../../domain/useCases/ICreateOrder';
import { ICouponRepository } from '../../infra/repositories/ICouponRepository';
import { IOrderRepository } from '../../infra/repositories/IOrderRepository';
import { IUserRepository } from '../../infra/repositories/IUserRepository';

export class CreateOrderUseCase implements ICreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private couponRepository: ICouponRepository,
    private userRepository: IUserRepository
  ) {}

  async createOrder(order: ICreateOrderDTO): Promise<Order> {
    if (!order.user_id) throw new Error('Missing user_id');
    const user = await this.userRepository.findById(order.user_id);
    if (!user) throw new Error('User not found');

    if (order.items.length === 0)
      throw new Error('Order must have at least one item');

    const hasInvalidDimensions = order.items.some(item => {
      if (
        item.width <= 0 ||
        item.height <= 0 ||
        item.thickness <= 0 ||
        item.weight <= 0
      )
        return true;
      return false;
    });

    if (hasInvalidDimensions)
      throw new Error('Some items has invalid dimensions or weight');

    const coupon = await this.couponRepository.findByCoupon(order.coupon);
    if (coupon && !coupon.isValid()) throw new Error('Invalid coupon');

    const newOrder = new Order(user);
    if (coupon) newOrder.addCoupon(coupon);

    for (let index = 0; index < order.items.length; index++) {
      const element = order.items[index];
      newOrder.addItem(element.description, element.quantity, element.price);
    }

    const orderSaved = await this.orderRepository.save(newOrder);
    return orderSaved;
  }
}
