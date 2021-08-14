import { Coupon } from '../entity/Coupon';

export interface CouponRepository {
  save(coupon: Coupon): Promise<Coupon>;
  getByCode(code: string): Promise<Coupon | undefined>;
}
