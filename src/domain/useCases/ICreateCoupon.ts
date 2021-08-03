import { Coupon } from '../entity/Coupon';

export type CouponDTO = {
  description: string;
  percentage: number;
  expiresIn: Date;
};

export interface ICreateCoupon {
  createCoupon(coupon: CouponDTO): Promise<Coupon>;
}
