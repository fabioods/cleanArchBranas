import { Coupon } from '../entity/Coupon';

export interface IListAllCouponsValid {
  listAllValidCoupons(): Promise<Coupon[] | null>;
}
