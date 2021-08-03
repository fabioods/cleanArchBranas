import { Coupon } from './Coupon';
import { OrderItem } from './OrderItem';
import { User } from './User';

export class Order {
  id: string;

  user: User;

  items: OrderItem[];

  coupon?: Coupon;

  source?: string;

  destination?: string;

  distance: number;

  constructor(user: User) {
    this.user = user;
    this.items = [];
  }

  addShipp(source: string, destination: string, distance: number): void {
    this.source = source;
    this.destination = destination;
    this.distance = distance;
  }

  getShipping(): number {
    if (this.source && this.destination && this.distance) {
      const calculateShippForItems = this.items.map(
        item => this.distance * item.getVolume() * (item.getDensity() / 100)
      );
      const shippingValue = calculateShippForItems.reduce(
        (acc, item) => acc + item,
        0
      );
      return shippingValue;
    }
    return 10;
  }

  getTotal(): number {
    let total = this.items.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) total -= (this.coupon.percentage * total) / 100;
    return total;
  }

  public addItem(
    description: string,
    quantity: number,
    price: number,
    height?: number,
    width?: number,
    thickness?: number,
    weight?: number
  ): void {
    const item = new OrderItem(
      description,
      quantity,
      price,
      height,
      width,
      thickness,
      weight
    );
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon): void {
    this.coupon = coupon;
  }
}
