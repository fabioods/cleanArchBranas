import { Coupon } from '../../../domain/entity/Coupon';
import { CouponRepository } from '../../../domain/repository/CouponRepository';

export class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  async save(coupon: Coupon): Promise<Coupon> {
    Object.assign(coupon, { id: `${this.coupons.length + 1}` });
    this.coupons.push(coupon);
    return coupon;
  }

  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find(coupon => coupon.description === code);
  }
}
