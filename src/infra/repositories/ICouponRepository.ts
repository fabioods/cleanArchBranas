import { Coupon } from '../../domain/entity/Coupon';

export interface ICouponRepository {
  save(coupon: Coupon): Promise<Coupon>;
  getAllValidCoupon(): Promise<Coupon[]>;
  findByCoupon(couponCode: string): Promise<Coupon | undefined>;
}
