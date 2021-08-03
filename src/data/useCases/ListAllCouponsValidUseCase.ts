import { Coupon } from '../../domain/entity/Coupon';
import { IListAllCouponsValid } from '../../domain/useCases/IListAllCouponsValid';
import { ICouponRepository } from '../../infra/repositories/ICouponRepository';

export class ListAllCouponsValidUseCase implements IListAllCouponsValid {
  constructor(private couponRepository: ICouponRepository) {}

  async listAllValidCoupons(): Promise<Coupon[] | null> {
    const validCoupons = await this.couponRepository.getAllValidCoupon();
    return validCoupons;
  }
}
