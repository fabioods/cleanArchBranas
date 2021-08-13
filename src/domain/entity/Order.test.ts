import { Coupon } from './Coupon';
import { Order } from './Order';

describe('Create Order', () => {
  it('should create a new order with three itens that sum 11', () => {
    const order = new Order('any_user_id');
    order.addItem('1', 1, 1);
    order.addItem('2', 2, 2);
    order.addItem('3', 2, 3);
    expect(order.getTotal()).toBe(11);
  });

  it('should create a new order a coupon for discount', () => {
    const coupon = new Coupon('Coupon X', 10, new Date());
    const order = new Order('any_user_id');
    order.addItem('1', 2, 2);
    order.addItem('2', 2, 3);
    order.addCoupon(coupon);
    expect(order.getTotal()).toBe(9);
  });
});
