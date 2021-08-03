import { v4 as uuid } from 'uuid';
import { Coupon } from '../../domain/entity/Coupon';
import { CouponDTO, ICreateCoupon } from '../../domain/useCases/ICreateCoupon';
import { ICouponRepository } from '../../infra/repositories/ICouponRepository';
import { IDateUtils } from '../protocols/IDateUtils';

export class CreateCouponUseCase implements ICreateCoupon {
  constructor(
    private couponRepository: ICouponRepository,
    private dateUtils: IDateUtils
  ) {}

  async createCoupon(coupon: CouponDTO): Promise<Coupon> {
    if (coupon.description.trim() === '') {
      throw new Error('Coupon description is required');
    }
    if (this.dateUtils.isBefore(coupon.expiresIn, new Date())) {
      throw new Error('Coupon expired is not allowed');
    }
    if (coupon.percentage <= 0 || coupon.percentage > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
    const couponEntity = new Coupon(
      uuid(),
      coupon.description,
      coupon.percentage,
      coupon.expiresIn
    );
    await this.couponRepository.save(couponEntity);
    return couponEntity;
  }
}
