import { Coupon } from '../../../domain/entity/Coupon';

export type CreateCouponInput = {
  description: string;
  percentage: number;
  expiresIn: Date;
};

export type CreateCouponOutput = {
  coupon: Coupon;
};
