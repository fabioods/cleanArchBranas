import { Coupon } from '../../../domain/entity/Coupon';
import { ICouponRepository } from '../ICouponRepository';

export class MemoryCouponRepository implements ICouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  async save(coupon: Coupon): Promise<Coupon> {
    this.coupons.push(coupon);
    return coupon;
  }

  async getAllValidCoupon(): Promise<Coupon[]> {
    const validCoupons = this.coupons.filter(coupon => coupon.isValid());
    return validCoupons;
  }

  async findByCoupon(couponCode: string): Promise<Coupon | undefined> {
    const coupon = this.coupons.find(c => c.description === couponCode);
    return coupon;
  }
}
